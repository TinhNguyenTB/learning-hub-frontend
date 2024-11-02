import { getPublishedSection } from "@/app/actions/sections"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { getPurchaseByCourseId } from "@/app/actions/purchases"
import { getCompletedProgress } from "@/app/actions/progress"
import { Session } from "@/lib/session"

interface CourseSideBarProps {
    course: ICourse
    studentId: string
    session: Session
}

const CourseSideBar = async ({ course, studentId, session }: CourseSideBarProps) => {
    const publishedSections = await getPublishedSection(course.id);
    const publishedSectionsId = publishedSections?.map(section => section.id);
    const purchase = await getPurchaseByCourseId(course.id, session)

    const completedSection = await getCompletedProgress(session, studentId, publishedSectionsId!);
    let progressPercentage = 0;
    if (completedSection && publishedSectionsId) {
        progressPercentage = (completedSection / publishedSectionsId.length) * 100;
    }

    return (
        <div className="hidden md:flex flex-col w-96 border-r shadow-md px-3 pt-8 m-0 gap-4 text-sm font-medium">
            <h1 className="text-lg font-semibold text-center mb-4">{course.title}</h1>
            {purchase &&
                <div >
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs mt-1">{Math.round(progressPercentage)}% completed</p>
                </div>
            }
            <Link
                className="p-3 rounded-lg hover:bg-black hover:text-white"
                href={`/courses/${course.id}/overview`}
            >
                Overview
            </Link>
            {publishedSections && publishedSections.map(section => (
                <Link
                    key={section.id}
                    className="p-3 rounded-lg hover:bg-black hover:text-white mt-1"
                    href={`/courses/${course.id}/sections/${section.id}`}
                >
                    {section.title}
                </Link>
            ))}
        </div>
    )
}
export default CourseSideBar