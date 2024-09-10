"use client"

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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { PasswordInput } from "@/components/custom/PasswordInput"
import { sendRequest } from "@/lib/api"
import toast from "react-hot-toast"
import ActivateModal from "./ActivateModal"
import { useState } from "react"


const formSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).trim().min(2, "Name must contain at least 2 character"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required"
    }).trim().min(1, "Password must contain at least 1 character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});


const SignUpForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const [openModal, setOpenModal] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>("");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
            method: 'POST',
            body: {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
        })
        if (res?.data) {
            toast.success("Please check your email to activate account.")
            setUserId(res.data.id)
            setOpenModal(true)
            form.reset()
        }
        else if (res?.error) {
            toast.error(res?.message)
        }
    }

    return (
        <>
            {/* {userId && */}
            <ActivateModal
                open={openModal}
                setOpen={setOpenModal}
                id={userId}
            />
            {/* } */}
            <Form {...form}>
                <fieldset className="border border-gray-300 rounded-md shadow-md p-6">
                    <legend >Sign up to Learning Hub </legend>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:min-w-[400px]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your name here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Type your password here..." {...field} />
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
                        <Button type="submit" className="w-full">Sign up</Button>
                    </form>
                    <Separator className="my-4" />
                    <div className="text-center">
                        Already have an account?
                        <Link href={'/sign-in'} className="hover:text-blue-600 hover:underline"> Sign in now</Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link className="hover:text-blue-600 hover:underline" href={'/'} >Back to home</Link>
                    </div>
                </fieldset>
            </Form>
        </>
    )
}

export default SignUpForm