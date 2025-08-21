import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "email-password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = getDb();
        const { data: user, error } = await db
          .from("auth_users")
          .select("id, email, password_hash, name, avatar_url")
          .eq("email", credentials.email.trim().toLowerCase())
          .single();

        if (error || !user || !user.password_hash) return null;
        const ok = await bcrypt.compare(credentials.password, user.password_hash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.avatar_url || undefined };
      },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        const kakaoAccount: any = (profile as any).kakao_account || {};
        const email = kakaoAccount.email ?? null;
        const nickname = kakaoAccount.profile?.nickname ?? "Kakao User";
        const avatar = kakaoAccount.profile?.profile_image_url ?? null;

        return {
          id: String(profile.id),
          email,
          name: nickname,
          image: avatar,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "kakao") return true;
      const db = getDb();
      const kakaoId = String((profile as any).id);

      const { data: existingByKakao } = await db
        .from("auth_users")
        .select("id")
        .eq("kakao_id", kakaoId)
        .single();

      if (existingByKakao) return true;

      const email = (user.email || null)?.toLowerCase() || null;
      const name = user.name || "Kakao User";
      const avatar_url = user.image || null;

      if (email) {
        // essaie de lier par email s’il existe
        const { data: byEmail } = await db
          .from("auth_users")
          .select("id")
          .eq("email", email)
          .single();

        if (byEmail) {
          await db.from("auth_users")
            .update({ kakao_id: kakaoId, name, avatar_url, updated_at: new Date().toISOString() })
            .eq("id", byEmail.id);
          return true;
        }
      }

      await db.from("auth_users").insert({
        email,
        name,
        avatar_url,
        kakao_id: kakaoId,
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email.toLowerCase();
      if (user?.id) token.uid = user.id;

      if (!token.uid && token.email) {
        const db = getDb();
        const { data } = await db
          .from("auth_users")
          .select("id")
          .eq("email", token.email)
          .single();
        if (data?.id) token.uid = data.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
