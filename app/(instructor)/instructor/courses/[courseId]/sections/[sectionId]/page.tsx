import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditSectionForm from "@/components/sections/EditSectionForm"
import { sendRequest } from "@/lib/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const SectionDetailPage = async ({ params }: { params: { courseId: string; sectionId: string } }) => {
    const session = await getServerSession(authOptions);

    let course;
    let section;
    const resCourse = await sendRequest<IBackendRes<ICourse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${params.courseId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (resCourse?.data) {
        course = resCourse.data
    }

    if (!course) {
        return redirect("/instructor/courses")
    }

    const resSection = await sendRequest<IBackendRes<ISection>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections/${params.sectionId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (resSection?.data) {
        section = resSection.data
    }

    if (!section) {
        return redirect(`/instructor/courses/${params.courseId}/sections`)
    }

    const isCompleted = false;

    return (
        <div className="px-10">
            <EditSectionForm
                section={section}
                courseId={params.courseId}
                isCompleted={isCompleted}
            />
        </div>
    )
}

export default SectionDetailPage