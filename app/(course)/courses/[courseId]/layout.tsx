import getCourseByIdForStudent from "@/app/actions/courses/getCourseByIdForStudent";
import CourseSideBar from "@/components/layout/CourseSideBar";
import TopBar from "@/components/layout/TopBar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const CourseDetailLayout = async ({
    children, params
}: {
    children: React.ReactNode,
    params: { courseId: string }
}) => {

    const session = await getSession()
    if (!session) {
        return redirect('/sign-in')
    }
    const user = session.user;

    const course = await getCourseByIdForStudent(params.courseId)
    if (!course) {
        return redirect('/')
    }

    return (
        <div className="h-full flex flex-col">
            <TopBar />
            <div className="flex-1 flex">
                <CourseSideBar course={course} studentId={user.id} />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default CourseDetailLayout