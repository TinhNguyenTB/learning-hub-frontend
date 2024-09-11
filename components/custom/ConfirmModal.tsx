'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


interface DialogProps {
    open: boolean
    setOpen: (v: boolean) => void
    title: string
    description?: string
    okButtonText?: string
    onOk: () => void
}

const ConfirmModal = ({ open, setOpen, title, description, okButtonText = "Ok", onOk }: DialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={(e) => {
                e.preventDefault()
            }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button onClick={() => {
                        onOk()
                        setOpen(false)
                    }}>{okButtonText}</Button>
                    <Button variant={"outline"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ConfirmModal