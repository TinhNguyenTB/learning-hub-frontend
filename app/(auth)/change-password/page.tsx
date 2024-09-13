import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ChangePasswordForm from '@/components/auth/ChangePasswordForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
    title: 'Change password',
}

const ChangePasswordPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect('/sign-in')
    }

    return (
        <div className='flex items-center justify-center mt-auto mb-auto h-screen'>
            <ChangePasswordForm session={session} />
        </div>
    )
}

export default ChangePasswordPage