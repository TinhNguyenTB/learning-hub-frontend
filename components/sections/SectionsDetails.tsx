"use client"

import { Button } from "@/components/ui/button"
import { sendRequest } from "@/lib/api"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import ProgressButton from "@/components/sections/ProgressButton"
import { Session } from "@/lib/session"
import SectionTabs from "@/components/sections/SectionTabs"


interface SectionsDetailsProps {
    course: ICourse
    section: ISection | undefined
    resources: IResource[] | undefined
    progress: IProgress | undefined
    purchase: IPurchase | undefined
    session: Session
}

const SectionsDetails = ({ course, resources, section, purchase, progress, session }: SectionsDetailsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isLocked = !purchase && !section?.isFree
    const router = useRouter();

    const buyCourse = async () => {
        try {
            setIsLoading(true);
            const res = await sendRequest<IBackendRes<any>>({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${course.id}/checkout`,
                headers: {
                    Authorization: `Bearer ${session.access_token}`
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
                    <ProgressButton
                        sectionId={section?.id}
                        isCompleted={!!progress?.isCompleted}
                        session={session}
                    />
                }
            </div>

            {isLocked ?
                <div className="px-10 flex flex-col gap-5 items-center bg-[#FFF8EB]">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm font-bold">Video for this section is locked. Please buy the course to access.</p>
                </div>
                :
                <ReactPlayer
                    url={section?.videoUrl}
                    className="max-w-full"
                    controls
                />
            }

            <SectionTabs
                session={session}
                section={section}
                resources={resources}
            />
        </div>
    )
}
export default SectionsDetails