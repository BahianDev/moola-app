import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        DiscordProvider({
            // @ts-ignore
            clientId: process.env.CLIENT_ID,
            userinfo: "https://discord.com/api/users/@me",

            // @ts-ignore
            clientSecret:  process.env.CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "identify"
                }
            },
            profile(profile) {
                console.log(profile)
                return {
                    id: profile.id,
                    name: profile.username,
                    discriminator: profile.discriminator,
                    accentColor: profile.accentColor
                }
            }
            // ...add more providers here
        })
    ],
    callbacks: {
        //@ts-ignore
        jwt: async ({ token, account, profile }) => {
            if (account) {
                token.accessToken = account.access_token
                token.tokenType = account.token_type
            }
            if (profile) {
                token.profile = profile
            }
            return token
        },
        // @ts-ignore
        session: async ({ session, token }) => {
            // @ts-ignore
            session.accessToken = token.accessToken
            // @ts-ignore
            session.refreshToken = token.refreshToken
            // @ts-ignore
            session.tokenType = token.tokenType
            // @ts-ignore
            session.discordUser = token.profile
            // @ts-ignore
            session.guilds = token.guilds
            return session
        }
    }
})
// @ts-ignore
export { handler as GET, handler as POST }