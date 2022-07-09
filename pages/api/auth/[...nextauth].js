import NextAuth from "next-auth"
import dbConnect from "lib/dbConnect"
import Permissions from "models/permissions"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_OAUTH_CLIENT_ID,
      clientSecret: process.env.TWITTER_OAUTH_CLIENT_SECRET,
      version: "2.0"
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect()
      try {
        user.name = profile.data.username
        user.image = profile.data.profile_image_url

        const permissionsExist = await Permissions.findOne(
          { uid: profile.data.id },
          { _id: 0 }
        ).lean()

        if (permissionsExist == null) {
          const newPermissions = new Permissions({
            uid: profile.data.id,
            permissions: ["read:user", "write:user"]
          })
          newPermissions.save()
        }

        return user
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async session({ session, token, user }) {
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
