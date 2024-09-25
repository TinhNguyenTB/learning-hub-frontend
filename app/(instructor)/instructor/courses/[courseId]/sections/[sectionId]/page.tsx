import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditSectionForm from "@/components/sections/EditSectionForm"
import { sendRequest } from "@/lib/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AlertBanner from "@/components/custom/AlertBanner";

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

    const requiredFields = [section.title, section.description, section.videoUrl];
    const requiredFieldsCount = requiredFields.length;
    const missingFields = requiredFields.filter(field => !Boolean(field));
    const missingFieldsCount = missingFields.length;
    const isCompleted = requiredFields.every(Boolean);

    return (
        <div className="px-10">
            <AlertBanner
                isCompleted={isCompleted}
                requiredFieldsCount={requiredFieldsCount}
                missingFieldCount={missingFieldsCount}
            />
            {session &&
                <EditSectionForm
                    session={session}
                    section={section}
                    courseId={params.courseId}
                    isCompleted={isCompleted}
                />
            }
        </div>
    )
}

export default SectionDetailPage