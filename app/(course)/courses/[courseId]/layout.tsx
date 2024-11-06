import { getCourseByIdForStudent } from "@/app/actions/courses";
import CourseSideBar from "@/components/layout/CourseSideBar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const CourseDetailLayout = async ({
    children, params
}: {
    children: React.ReactNode,
    params: { courseId: string }
}) => {

    const session = await getSession()
    if (!session || !session.user) {
        return redirect('/sign-in')
    }
    const user = session.user;

    const course = await getCourseByIdForStudent(params.courseId)
    if (!course) {
        return redirect('/')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex">
                <CourseSideBar
                    course={course}
                    studentId={user.id}
                    session={session}
                />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default CourseDetailLayout