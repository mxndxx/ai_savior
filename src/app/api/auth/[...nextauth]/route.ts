export const runtime = "nodejs"; // important pour bcrypt

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

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  logger: {
    error(code, meta) { console.error("[nextauth:error]", code, meta); },
    warn(code) { console.warn("[nextauth:warn]", code); },
    debug(code, meta) { console.log("[nextauth:debug]", code, meta); },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    Credentials({
      name: "email-password",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
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

          if (error) { console.error("[auth] select error", error); return null; }
          if (!user?.password_hash) { console.error("[auth] user not found or no hash", { email }); return null; }

          const ok = await bcrypt.compare(credentials.password, user.password_hash);
          if (!ok) { console.error("[auth] wrong password", { email }); return null; }

          return { id: String(user.id), email: user.email, name: user.name ?? null, image: user.avatar_url ?? null };
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
    async signIn({ user, account, profile }) { return true; },
    async jwt({ token, user }) { if ((user as any)?.id) token.uid = String((user as any).id); return token; },
    async session({ session, token }) { if (session.user) (session.user as any).id = token.uid; return session; },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
