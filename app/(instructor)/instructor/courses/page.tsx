import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import { sendRequest } from '@/lib/api';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const CoursesPage = async () => {
    let courses;
    const session = await getServerSession(authOptions)

    const res = await sendRequest<IBackendRes<IModelPaginate<ICourse>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (res?.data) {
        courses = res.data.result
    }
    return (
        <div className='px-6 py-4'>
            <Link href={"create-course"}>
                <Button>Create New Course</Button>
            </Link>
            <div className='mt-10'>
                {courses?.map(item => {
                    return (
                        <Link key={item.id} href={`/instructor/courses/${item.id}`}>
                            {item.title}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default CoursesPage