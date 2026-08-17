import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (!user.email) return false;

      await connectDB();
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          gamertag: user.email.split("@")[0],
          password: "google-oauth",
        });
      }
      return true;
    },
    async jwt({ token }: { token: any }) {
      if (!token.email) return token;

      await connectDB();
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.role = dbUser.role;
        token.id = dbUser._id.toString();
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };