'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const TopBar = () => {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                Signed in as {session?.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <div>
            TopBar
            <Link href={'/sign-in'}>Sign in</Link>
        </div>

    )
}

export default TopBar