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
      },
      redirectUri: 'https://www.lumidiscord.xyz/api/auth/callback/discord'
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Garantir redirecionamento correto para www.lumidiscord.xyz
      if (url.startsWith('/')) return `https://www.lumidiscord.xyz${url}`
      else if (new URL(url).origin === 'https://www.lumidiscord.xyz') return url
      return 'https://www.lumidiscord.xyz'
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.sub
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.guilds = profile.guilds || []
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
})