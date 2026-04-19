import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile?.oid) {
        token.oid = profile.oid as string
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.oid as string) ?? token.sub ?? ""
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
