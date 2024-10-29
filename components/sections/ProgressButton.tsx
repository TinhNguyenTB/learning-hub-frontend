import { Button } from "@/components/ui/button"
import { sendRequest } from "@/lib/api"
import { Session } from "@/lib/session"
import { CheckCircle, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ProgressButtonProps {
    sectionId: string | undefined
    isCompleted: boolean
    session: Session
}

const ProgressButton = ({ sectionId, isCompleted, session }: ProgressButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await sendRequest<IBackendRes<IProgress>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/progress/upsert`,
                method: "POST",
                body: {
                    sectionId,
                    studentId: session.user.id,
                    isCompleted: !isCompleted
                },
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            })
            toast.success("Progress Updated")
            router.refresh()
        } catch (error) {
            console.log("Failed to update progress", error);
            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Button variant={isCompleted ? "complete" : "default"} onClick={() => handleClick()}>
            {isLoading ?
                <Loader className="h-4 w-4 animate-spin" />
                :
                isCompleted ?
                    <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Completed</span>
                    </div>
                    :
                    <span>Mark as complete</span>
            }
        </Button>
    )
}
export default ProgressButton