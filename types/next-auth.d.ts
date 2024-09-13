import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

interface IUser {
    name: string
    id: string
    email: string
    image: string
    role: string
    accountType: string
    isActive: boolean
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        access_token: string
        // refresh_token: string
        user: IUser
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        access_token: string
        // refresh_token: string
        user: IUser
    }
}
