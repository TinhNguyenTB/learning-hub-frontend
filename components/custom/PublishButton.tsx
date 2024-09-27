'use client'

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { sendRequest } from "@/lib/api"
import { Session } from "next-auth"

interface PublishButtonProps {
    disabled: boolean
    courseId: string
    sectionId?: string
    isPublished: boolean
    page: string
    session: Session
}

const PublishButton = ({ disabled, courseId, sectionId, isPublished, page, session }: PublishButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        let endpoint = `api/v1/courses/publish`
        if (page === "Section") {
            endpoint = `api/v1/sections/publish`
        }
        try {
            setIsLoading(true);
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`,
                method: 'POST',
                body: {
                    courseId,
                    sectionId,
                    isPublish: !isPublished
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success(`${page} ${isPublished ? "unpublished" : "published"}`);
                router.refresh()
            }
            else if (res.error) {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(`Failed to ${isPublished ? "unpublish" : "publish"} ${page}`, error)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Button variant={'outline'} disabled={disabled || isLoading}
            onClick={() => handleClick()}
        >
            {isLoading ?
                <Loader2 className="h-4 w-4 animate-spin" />
                :
                isPublished ? "Unpublish" : "Publish"
            }
        </Button>
    )
}
export default PublishButton