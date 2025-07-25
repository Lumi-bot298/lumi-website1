import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email guilds'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.user.profile = token.profile
      return session
    },
    async redirect({ url, baseUrl }) {
      // Permite redirecionamentos para URLs do mesmo domínio
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Permite redirecionamentos para o domínio base
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
})