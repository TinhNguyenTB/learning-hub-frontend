"use client"

import { Button } from "@/components/ui/button"
import { sendRequest } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface SectionsDetailsProps {
    course: ICourse
    // section: ISection
    resources: IResource[] | []
    // progress: IProgress | null
    purchase: IPurchase | undefined
    access_token: string
}

const SectionsDetails = ({ course, resources, purchase, access_token }: SectionsDetailsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

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
                {/* <h1 className="text-2xl font-semibold max-md:mb-4">{section.title}</h1> */}
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
        </div>
    )
}
export default SectionsDetails