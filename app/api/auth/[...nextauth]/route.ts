import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
 export const authOptions: AuthOptions = {
  adapter:PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages:{
    signIn:"/sign-in"
  },
  callbacks: {
    session({ session, user }: { session: any; user: { id: string } }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret:process.env.NEXTAUTH_URL
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
