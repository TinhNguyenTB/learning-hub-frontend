"use client"

import { Button } from "@/components/ui/button"
import { sendRequest } from "@/lib/api"
import { File, Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import ReadText from "@/components/custom/ReadText"
import toast from "react-hot-toast"
import ReactPlayer from "react-player/lazy"

interface SectionsDetailsProps {
    course: ICourse
    section: ISection | undefined
    resources: IResource[] | undefined
    progress: IProgress | undefined
    purchase: IPurchase | undefined
    access_token: string
}

const SectionsDetails = ({ course, resources, section, purchase, access_token }: SectionsDetailsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isLocked = !purchase && !section?.isFree

    const router = useRouter()
    console.log(section?.videoUrl)
    const buyCourse = async () => {
        try {
            setIsLoading(true);
            const res = await sendRequest<IBackendRes<any>>({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${course.id}/checkout`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            if (res.data) {
                router.push(res.data.url)
            }
        } catch (error) {
            console.log("Failed to checkout course", error)
            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="px-6 py-4 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-semibold max-md:mb-4">{section?.title}</h1>
                {!purchase ?
                    <Button onClick={() => buyCourse()}>
                        {isLoading ?
                            <Loader2 className="h-4 w-4 animate-spin" />
                            :
                            <p>Buy this course</p>
                        }
                    </Button>
                    :
                    <Button>Mark as complete</Button>
                }
            </div>
            <ReadText value={section?.description!} />
            {isLocked ?
                <div className="px-10 flex flex-col gap-5 items-center bg-[#FFF8EB]">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm font-bold">Video for this section is locked. Please buy the course to access.</p>
                </div>
                :
                section && section.videoUrl &&
                <ReactPlayer
                    url={section?.videoUrl}
                    className="md:max-w-[600px]"
                    controls
                />
            }
            <div>
                <h2 className="text-xl font-bold mb-5">
                    Resources
                </h2>
                {resources?.map(resource => (
                    <Link
                        target="_blank"
                        href={resource.fileUrl}
                        className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                    >
                        <File className="h-4 w-4 mr-4" />
                        {resource.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default SectionsDetails