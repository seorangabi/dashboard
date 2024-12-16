// import { generateErrorMessage } from "@/common/lib/utils";
// import authService from "@/common/services/auth";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const res = await authService
    //       .login({
    //         body: {
    //           username: credentials?.username || "",
    //           password: credentials?.password || "",
    //         },
    //       })
    //       .catch((err) => {
    //         throw new Error(generateErrorMessage(err));
    //       });

    //     console.log("res", res);
    //     const doc = res?.data?.doc;

    //     if (doc)
    //       return {
    //         id: doc.user.id,
    //         role: "admin",
    //         accessToken: doc.accessToken,
    //         accessTokenExpires: doc.accessTokenExpires,
    //       };

    //     return null;
    //   },
    //   type: "credentials",
    // }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        // @ts-expect-error next-auth
        const googleProfile = profile as GoogleProfile;
        return googleProfile?.email_verified;
      }

      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
      }

      if (trigger === "signIn") {
        if (user?.accessToken) token.accessToken = user.accessToken;
        if (user?.accessTokenExpires)
          token.accessTokenExpires = user.accessTokenExpires;
      }

      if (trigger === "update") {
        if (session?.accessToken) token.accessToken = session.accessToken;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken as string;

      if (typeof token.accessTokenExpires === "number")
        session.expires = new Date(
          token.accessTokenExpires * 1000
        ).toISOString();

      return session;
    },
  },
};
export default NextAuth(authOptions);
