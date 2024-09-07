'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const TopBar = () => {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <div>
            TopBar
            <button onClick={() => signIn()}>Sign in</button>
        </div>

    )
}

export default TopBar