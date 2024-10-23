import { columns } from '@/components/courses/Columns';
import { DataTable } from '@/components/custom/DataTable';
import { Button } from '@/components/ui/button';
import { sendRequest } from '@/lib/api';
import { getSession } from '@/lib/session';
import Link from 'next/link';

const CoursesPage = async () => {
    let courses;
    const session = await getSession()

    const res = await sendRequest<IBackendRes<ICourse[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/instructor`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (res?.data) {
        courses = res.data
    }
    return (
        <div className='px-6 py-8'>
            <Link href={"create-course"}>
                <Button>Create New Course</Button>
            </Link>
            <div className='mt-5'>
                {courses &&
                    <DataTable
                        columns={columns}
                        data={courses}
                    />
                }
            </div>
        </div>
    )
}

export default CoursesPage