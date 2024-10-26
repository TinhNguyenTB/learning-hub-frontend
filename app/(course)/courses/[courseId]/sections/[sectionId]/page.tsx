import getCourseByIdForStudent from "@/app/actions/courses/getCourseByIdForStudent";
import getPurchaseByCourseId from "@/app/actions/purchases/getPurchaseByCourseId";
import SectionsDetails from "@/components/sections/SectionsDetails";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";


const SectionDetailPage = async ({ params }: { params: { courseId: string; sectionId: string } }) => {
    const session = await getSession();
    if (!session || !session.user) {
        return redirect("/sign-in")
    }
    const course = await getCourseByIdForStudent(params.courseId)
    if (!course) {
        return redirect('/')
    }
    // const section = await db.section.findUnique({
    //     where: {
    //         id: params.sectionId,
    //         courseId: params.courseId,
    //         isPublished: true
    //     }
    // })
    // if (!section) {
    //     return redirect(`/courses/${params.courseId}/overview`)
    // }
    const purchase = await getPurchaseByCourseId(params.courseId, session)


    let resources: IResource[] = [];
    // const progress = await db.progress.findUnique({
    //     where: {
    //         studentId_sectionId: {
    //             studentId: session.user.id,
    //             sectionId: params.sectionId
    //         }
    //     }
    // })

    return (
        <>
            <div>SectionDetailPage</div>
            <SectionsDetails
                access_token={session.access_token}
                course={course}
                // section={section}
                purchase={purchase}
                // progress={progress}
                resources={resources}
            />
        </>
    )
}

export default SectionDetailPage