import NextAuth from "next-auth"
import dbConnect from "src/lib/dbConnect"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await dbConnect()
      try {
        user.name = profile.screen_name

        return user
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async jwt({ token, _, account = {} }) {
      if (!account?.provider) return token
      let newToken = { ...token }
      if (account) {
        newToken = {
          ...token,
          accessToken: account.oauth_token,
          refreshToken: account.oauth_token_secret
        }
      }

      return newToken
    },
    async session({ session, token }) {
      session.user.uid = token.sub
      return session
    }
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
    maxAge: 60 * 60 * 24 * 30
  }
})
