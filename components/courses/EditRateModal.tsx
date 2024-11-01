"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Rating } from "react-simple-star-rating"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import toast from "react-hot-toast"
import { Session } from "@/lib/session"
import { editRate } from "@/app/actions/ratings"
import { useHasMounted } from "@/lib/customHook"

interface EditRateModalProps {
    open: boolean
    setOpen: (v: boolean) => void
    id: string
    content: string
    quality: number
    current: number
    fetchAllRatings: (v: number) => void
    session: Session
    courseId: string | undefined
}

const EditRateModal = ({ open, setOpen, id, content, quality, current, fetchAllRatings, session, courseId }: EditRateModalProps) => {
    const [newRating, setNewRating] = useState(quality);
    const [newContent, setNewContent] = useState(content);
    const [error, setError] = useState<string | null>(null);

    const handleRatingChange = (rate: number) => {
        setNewRating(rate);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(e.target.value);
    };

    const handleSubmit = async () => {
        // Validate that both rating and content are filled
        if (newRating === 0) {
            setError('Please provide a rating.');
            return;
        }
        if (!newContent.trim()) {
            setError('Please provide some content for your rating.');
            return;
        }
        // Clear any previous error
        setError(null);

        const res = await editRate(session, id, newContent, newRating, courseId!)
        if (res.data) {
            toast.success("Rate success")
            fetchAllRatings(current);
            setOpen(false)
        }
        else if (res.error) {
            toast.error("Something went wrong")
            console.log(error)
        }

        fetchAllRatings(current);
        setNewRating(0);
        setNewContent('');
    };

    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return <></>
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={(e) => {
                e.preventDefault()
            }}
            >
                <DialogHeader>
                    <DialogTitle>Edit your rate</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Rating
                        onClick={handleRatingChange}
                        allowFraction
                        initialValue={quality}
                    />
                    <Textarea
                        placeholder="Write your rate here..."
                        value={newContent}
                        onChange={handleContentChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditRateModal