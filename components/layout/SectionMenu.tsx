import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SectionMenu = ({ course }: { course: ICourse }) => {
    return (
        <div className="w-full max-w-[200x] z-20 md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button>Sections</Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <Link
                        className="p-3 rounded-lg hover:bg-black hover:text-white mt-4"
                        href={`/courses/${course.id}/overview`}
                    >
                        Overview
                    </Link>
                    {course.sections.map(section => (
                        <Link
                            key={section.id}
                            className="p-3 rounded-lg hover:bg-black hover:text-white mt-2"
                            href={`/courses/${course.id}/sections/${section.id}`}
                        >
                            {section.title}
                        </Link>
                    ))}
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default SectionMenu