'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendRequest } from "@/lib/api";
import toast from "react-hot-toast";
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface DialogProps {
    open: boolean
    setOpen: (v: boolean) => void
}

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPasswordModal = ({ open, setOpen }: DialogProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgot-password`,
            method: 'POST',
            body: {
                email: values.email
            }
        })
        if (!res?.error) {
            setOpen(false)
            toast.success("Please check your email to receive a new password")
        }
        else if (res?.error) {
            toast.error(res.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={(e) => {
                e.preventDefault()
            }}
            >
                <DialogHeader>
                    <DialogTitle>Forgot password</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:min-w-[400px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your email here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPasswordModal