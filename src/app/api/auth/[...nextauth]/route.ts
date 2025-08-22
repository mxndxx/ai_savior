export const runtime = "nodejs";

import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

function getDbAdmin() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

const isProd = process.env.NODE_ENV === "production";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: !isProd,
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    Credentials({
      name: "email-password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const db = getDbAdmin();
          const email = credentials.email.trim().toLowerCase();

          const { data: user, error } = await db
            .from("auth_users")
            .select("id, email, password_hash, name, avatar_url")
            .eq("email", email)
            .maybeSingle();

          if (error) {
            console.error("[auth] select error", error);
            return null;
          }
          if (!user?.password_hash) {
            console.error("[auth] user not found or no hash", { email });
            return null;
          }

          const ok = await bcrypt.compare(credentials.password, user.password_hash);
          if (!ok) {
            console.error("[auth] wrong password", { email });
            return null;
          }

          return {
            id: String(user.id),
            email: user.email,
            name: user.name ?? null,
            image: user.avatar_url ?? null,
          };
        } catch (e) {
          console.error("[auth] authorize exception", e);
          return null;
        }
      },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      authorization: { params: { scope: "profile_nickname profile_image" } },
      allowDangerousEmailAccountLinking: true,
      profile(p: any) {
        const acct = p?.kakao_account ?? {};
        return {
          id: String(p.id),
          email: acct.email ?? null,
          name: acct.profile?.nickname ?? "Kakao User",
          image: acct.profile?.profile_image_url ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "kakao") return true;
      const db = getDbAdmin();
      const kakaoId = String((profile as any).id);

      const { data: existing } = await db.from("auth_users").select("id").eq("kakao_id", kakaoId).maybeSingle();
      if (existing) return true;

      const email = user.email?.toLowerCase() ?? null;
      const name = user.name || "Kakao User";
      const avatar_url = user.image || null;

      if (email) {
        const { data: byEmail } = await db.from("auth_users").select("id").ilike("email", email).maybeSingle();
        if (byEmail) {
          await db.from("auth_users").update({ kakao_id: kakaoId, name, avatar_url, updated_at: new Date().toISOString() }).eq("id", byEmail.id);
          return true;
        }
      }
      await db.from("auth_users").insert({ email, name, avatar_url, kakao_id: kakaoId });
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email.toLowerCase();
      if ((user as any)?.id) token.uid = (user as any).id;
      if (!token.uid && token.email) {
        const db = getDbAdmin();
        const { data } = await db.from("auth_users").select("id").ilike("email", token.email).maybeSingle();
        if (data?.id) token.uid = data.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.uid;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
