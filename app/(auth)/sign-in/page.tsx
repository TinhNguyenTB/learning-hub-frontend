import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInForm from '@/components/auth/SignInForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
    title: 'Sign in',
}

const SignInPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        return redirect('/')
    }

    return (
        <div className='flex items-center justify-center mt-auto mb-auto h-screen'>
            <SignInForm />
        </div>
    )
}

export default SignInPage