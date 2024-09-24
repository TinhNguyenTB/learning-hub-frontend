import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Loader2, Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { sendRequest } from "@/lib/api";
import { Session } from "next-auth";

interface DeleteProps {
    item: string;
    courseId: string;
    sectionId: string;
    session: Session
}

const Delete = ({ item, courseId, sectionId, session }: DeleteProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            const url = item === "course" ? `api/v1/courses/${courseId}` : `api/v1/sections/${sectionId}`
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
                method: 'DELETE',
                body: {
                    courseId
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            const pushedUrl = item === "course" ? `/instructor/courses` : `/instructor/courses/${courseId}/sections`
            if (res?.data) {
                router.push(pushedUrl);
                router.refresh();
                toast.success(`${item} deleted`)
            }
        }
        catch (error) {
            toast.error("Something went wrong")
            console.log(`Failed to delete the ${item}`, error)
        }
        finally {
            setIsDeleting(false);
        }
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button className="bg-red-500 hover:bg-red-600">
                        {isDeleting ?
                            <Loader2 className="h-4 w-4 animate-spin" />
                            :
                            <Trash className="h-4 w-4" />
                        }
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your {item}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete()}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
export default Delete