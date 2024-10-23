import CreateSectionForm from "@/components/sections/CreateSectionForm"
import { sendRequest } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const CourseCurriculumPage = async ({ params }: { params: { courseId: string } }) => {
    const session = await getSession();

    let course;
    const res = await sendRequest<IBackendRes<ICourse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${params.courseId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (res?.data) {
        course = res.data
    }
    if (!course) {
        return redirect('/instructor/courses')
    }

    return (
        <div>
            {session &&
                <CreateSectionForm course={course} session={session} />
            }
        </div>
    )
}

export default CourseCurriculumPage