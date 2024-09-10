import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { sendRequest } from "@/lib/api";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider === 'github') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',
                    body: {
                        accountType: 'GITHUB',
                        name: user.name ?? user.email,
                        email: user.email,
                        image: user.image
                    }
                })
                if (res.data) {
                    token.access_token = res.data.access_token
                    token.user = res.data.user
                }
            }
            return token
        },
        async session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token
                session.user = token.user
            }
            return session
        },
    }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }