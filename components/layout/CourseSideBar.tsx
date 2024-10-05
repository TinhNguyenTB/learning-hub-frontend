import getPublishedSection from "@/app/actions/sections/getPublishedSection"
import Link from "next/link"

interface CourseSideBarProps {
    course: ICourse
    studentId: string
}

const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
    const publishedSections = await getPublishedSection(course.id);

    return (
        <div className="hidden md:flex flex-col w-64 border-r shadow-md px-3 pt-8 m-0 gap-4 text-sm font-medium">
            <h1 className="text-lg font-semibold text-center mb-4">{course.title}</h1>
            <Link
                className="p-3 rounded-lg hover:bg-[#FFF8EB]"
                href={`/courses/${course.id}/overview`}
            >
                Overview
            </Link>
            {publishedSections && publishedSections.map(section => (
                <Link
                    key={section.id}
                    className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4"
                    href={`/courses/${course.id}/sections/${section.id}`}
                >
                    {section.title}
                </Link>
            ))}
        </div>
    )
}
export default CourseSideBar