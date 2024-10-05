import getCourseByIdForStudent from "@/app/actions/courses/getCourseByIdForStudent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CourseSideBar from "@/components/layout/CourseSideBar";
import TopBar from "@/components/layout/TopBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CourseDetailLayout = async ({
    children, params
}: {
    children: React.ReactNode,
    params: { courseId: string }
}) => {

    const session = await getServerSession(authOptions)
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