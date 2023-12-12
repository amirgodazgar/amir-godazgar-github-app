import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
