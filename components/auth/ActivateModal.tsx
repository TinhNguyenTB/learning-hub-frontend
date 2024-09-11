'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Countdown from 'react-countdown';
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
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface DialogProps {
    open: boolean
    setOpen: (v: boolean) => void
    id: string
    email: string
}

interface CountdownProps {
    completed: boolean
    minutes: number
    seconds: number
}

const formSchema = z.object({
    code: z.string({
        required_error: "Code is required"
    }).trim().min(12, "Code must contain 12 characters"),

});

const ActivateModal = ({ open, setOpen, id, email }: DialogProps) => {
    const router = useRouter();
    const [countdownKey, setCountdownKey] = useState(0); // State to trigger re-render
    const timeToCount = useRef(Date.now() + 1000 * parseInt(process.env.NEXT_PUBLIC_ACTIVATE_CODE_EXPIRED!)); // 5 minutes

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }: CountdownProps) => {
        if (completed) {
            // Render a completed state
            return (
                <div className="flex items-center justify-center gap-4">
                    <span className="text-red-600">Your activation code has expired!</span>
                    <Button onClick={() => {
                        handleReActivate()
                        //Resetting Time
                        timeToCount.current = Date.now() + 1000 * parseInt(process.env.NEXT_PUBLIC_ACTIVATE_CODE_EXPIRED!)
                        setCountdownKey(prevKey => prevKey + 1); // Trigger re-render
                    }}>Resend email</Button>
                </div>
            )
        } else {
            // Render a countdown
            return (
                <div className="text-center">
                    <p>Your activation code will expire after:</p>
                    <span>{minutes}:{seconds}</span>
                </div>
            )
        }
    }

    async function handleReActivate() {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-activate`,
            method: 'POST',
            body: {
                email
            }
        })
        if (!res.error) {
            toast.success("Please check your email")
        }
        else if (res.error) {
            toast.error(res.message)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/activate`,
            method: 'POST',
            body: {
                id,
                code: values.code
            }
        })
        if (res?.data && res.data.isActive) {
            setOpen(false)
            toast.success("Your account has been successfully activated")
            router.push("/sign-in")
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
                    <DialogTitle>Activate your account</DialogTitle>
                    <DialogDescription>
                        Please check your email and enter the code in the input below
                    </DialogDescription>
                </DialogHeader>
                <Countdown
                    date={timeToCount.current}
                    renderer={renderer}
                    key={countdownKey} // Use key to reset countdown
                />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:min-w-[400px]">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your activation code here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Activate</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ActivateModal