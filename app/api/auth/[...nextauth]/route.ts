import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { sendRequest } from "@/lib/api";
import { JWT } from "next-auth/jwt";
import { IUser } from "@/types/next-auth";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<IUser>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
                    method: 'POST',
                    body: {
                        email: credentials?.username,
                        password: credentials?.password
                    }
                })

                if (res?.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',
                    body: {
                        accountType: account?.provider.toUpperCase(),
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
            else if (trigger === 'signIn' && account?.provider == 'credentials') {
                //@ts-ignore
                token.user = user.user
                //@ts-ignore
                token.access_token = user.access_token
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
    },
    pages: {
        signIn: '/sign-in',
    }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }