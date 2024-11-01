import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReadText from "@/components/custom/ReadText"
import Link from "next/link"
import { File } from "lucide-react"
import Comments from "@/components/custom/Comment"
import CourseRating from "../courses/CourseRating"
import { Session } from "@/lib/session"

interface SectionTabsProps {
    section: ISection | undefined
    resources: IResource[] | undefined
    session: Session
}

const SectionTabs = ({ section, resources, session }: SectionTabsProps) => {

    return (
        <Tabs defaultValue="resources" className="w-full">
            <TabsList>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
                <ReadText value={section?.description!} />
            </TabsContent>

            <TabsContent value="resources">
                {resources && resources.length > 0
                    ?
                    resources.map(resource => (
                        <Link key={resource.id}
                            target="_blank"
                            href={resource.fileUrl}
                            className="flex items-center bg-[rgb(241,245,249)] rounded-lg text-sm font-medium mt-5 p-3"
                        >
                            <File className="h-4 w-4 mr-4" />
                            {resource.name}
                        </Link>
                    ))
                    :
                    <p className="mt-5">This section has no resources.</p>
                }
            </TabsContent>

            <TabsContent value="comments">
                <Comments />
            </TabsContent>

            <TabsContent value="ratings">
                <CourseRating
                    session={session}
                    courseId={section?.courseId}
                />
            </TabsContent>
        </Tabs>

    )
}

export default SectionTabs