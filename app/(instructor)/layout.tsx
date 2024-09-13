import TopBar from '@/components/layout/TopBar'
import Sidebar from '@/components/layout/Sidebar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const InstructorLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect('/sign-in')
    }
    return (
        <div className='h-full flex flex-col'>
            <TopBar />
            <div className='flex-1 flex'>
                <Sidebar />
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default InstructorLayout