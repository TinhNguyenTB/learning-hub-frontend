'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { PasswordInput } from "@/components/custom/PasswordInput"
import { sendRequest } from "@/lib/api"
import toast from "react-hot-toast"
import { Session } from "@/lib/session"

const formSchema = z.object({
    oldPassword: z.string({
        required_error: "Old password is required"
    }).trim().min(1, "Old password must contain at least 1 character"),
    password: z.string({
        required_error: "Password is required"
    }).trim().min(1, "Password must contain at least 1 character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

const ChangePasswordForm = ({ session }: { session: Session }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/change-password`,
            method: 'POST',
            body: {
                oldPassword: values.oldPassword,
                password: values.password,
                confirmPassword: values.confirmPassword
            },
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        })
        if (res?.data) {
            toast.success("Password changed successfully")
            form.reset()
            fetch("/api/auth/signout")
        }
        else if (res?.error) {
            toast.error(res?.message)
        }
    }

    return (
        <Form {...form}>
            <fieldset className="border border-gray-300 rounded-md shadow-md p-6">
                <legend >Change Password</legend>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:min-w-[400px]">
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="Type your old password here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="Type your new password here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="Type your confirm password here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Change</Button>
                </form>

                <div className="text-center mt-3">
                    <Link className="hover:text-blue-600 hover:underline" href={'/'} >Back to home</Link>
                </div>
            </fieldset>
        </Form>
    )
}

export default ChangePasswordForm