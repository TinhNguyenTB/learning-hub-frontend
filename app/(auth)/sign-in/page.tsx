import SignInForm from '@/components/auth/SignInForm'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
    title: 'Sign in',
}

const SignInPage = async () => {
    const session = await getSession()
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