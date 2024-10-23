import SignUpForm from "@/components/auth/SignUpForm"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import type { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
    title: 'Sign up',
}

const SignUpPage = async () => {
    const session = await getSession()
    if (session) {
        return redirect('/')
    }

    return (
        <div className='flex items-center justify-center mt-auto mb-auto h-screen'>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage