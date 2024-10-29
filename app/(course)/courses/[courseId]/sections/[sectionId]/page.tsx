import { getCourseByIdForStudent } from "@/app/actions/courses";
import { getProgressByStudentId } from "@/app/actions/progress";
import { getPurchaseByCourseId } from "@/app/actions/purchases";
import { getResourcesBySectionId } from "@/app/actions/resources";
import { getPublishedSectionById } from "@/app/actions/sections";
import SectionsDetails from "@/components/sections/SectionsDetails";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";


const SectionDetailPage = async ({ params }: { params: { courseId: string; sectionId: string } }) => {
    const session = await getSession();
    if (!session || !session.user) {
        return redirect("/sign-in")
    }

    const { access_token } = session;
    const course = await getCourseByIdForStudent(params.courseId)
    if (!course) {
        return redirect('/')
    }

    const section = await getPublishedSectionById(access_token, params.sectionId)
    if (!section) {
        return redirect(`/courses/${params.courseId}/overview`)
    }

    const purchase = await getPurchaseByCourseId(params.courseId, session)

    let resources: IResource[] | undefined = [];
    if (purchase) {
        resources = await getResourcesBySectionId(params.sectionId)
    }
    const progress = await getProgressByStudentId(session.access_token, session.user.id, params.sectionId)

    return (
        <>
            <div>SectionDetailPage</div>
            <SectionsDetails
                session={session}
                course={course}
                section={section}
                purchase={purchase}
                progress={progress}
                resources={resources}
            />
        </>
    )
}

export default SectionDetailPage