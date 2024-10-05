import getCourseByIdForStudent from "@/app/actions/courses/getCourseByIdForStudent"
import getLevelById from "@/app/actions/levels/getLevelById"
import getUserById from "@/app/actions/users/getUserById"
import ReadText from "@/components/custom/ReadText"
import Image from "next/image"
import { redirect } from "next/navigation"

const CourseOverview = async ({ params }: { params: { courseId: string } }) => {
    const course = await getCourseByIdForStudent(params.courseId)
    if (!course) {
        return redirect('/')
    }

    const instructor = await getUserById(course.instructorId)
    let level;
    if (course.levelId) {
        level = await getLevelById(course.levelId)
    }
    return (
        <div className="px-6 py-4 flex flex-col gap-5 text-sm">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">{course.title}</h1>
                {/* Section menu for mobile */}
            </div>
            <p className="font-medium">{course.subTitle}</p>
            <div className="flex gap-2 items-center">
                <Image
                    src={instructor?.image || "/avatar_placeholder.jpg"}
                    alt={instructor?.name || "Instructor photo"}
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <p>{instructor?.name}</p>
            </div>
            <div className="flex gap-2">
                <p className="font-semibold">Price:</p>
                <p>${course.price}</p>
            </div>
            <div className="flex gap-2">
                <p className="font-semibold">Level:</p>
                <p>{level?.name}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-semibold">Description:</p>
                <ReadText value={course.description!} />
            </div>
        </div>
    )
}
export default CourseOverview