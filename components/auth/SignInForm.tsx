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
import { FaGoogle, FaGithub } from "react-icons/fa";
import TooltipCustom from "@/components/custom/Tooltip.custom"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { PasswordInput } from "@/components/custom/PasswordInput"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal"
import ActivateModal from "@/components/auth/ActivateModal"
import ConfirmModal from "@/components/custom/ConfirmModal"
import { sendRequest } from "@/lib/api"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required"
    }).trim().min(1, "Password must contain at least 1 character")
})


const SignInForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const router = useRouter();
    const [openModalForgotPass, setOpenModalForgotPass] = useState<boolean>(false);
    const [openModalActivate, setOpenModalActivate] = useState<boolean>(false);
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await signIn("credentials", {
            username: values.email,
            password: values.password,
            redirect: false
        })
        if (!res?.error) {
            // redirect to home
            router.push("/")
        }
        else {
            const errorResponse = JSON.parse(res.error)
            const { message, statusCode } = errorResponse
            if (statusCode === 403) {
                setUserEmail(values.email)
                setOpenConfirmModal(true)
            }
        }
    }

    async function retryActivate() {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-activate`,
            method: 'POST',
            body: {
                email: userEmail
            }
        })
        if (res?.data) {
            setOpenConfirmModal(false)
            setUserId(res.data.id)
            toast.success("Please check your email")
            setOpenModalActivate(true)
        }
        else if (res?.error) {
            toast.error(res.message)
        }
    }

    return (
        <>
            <ForgotPasswordModal
                key={"ForgotPasswordModal"}
                open={openModalForgotPass}
                setOpen={setOpenModalForgotPass}
            />
            <ConfirmModal
                key={"ConfirmModal"}
                open={openConfirmModal}
                setOpen={setOpenConfirmModal}
                description="Do you want activate account now?"
                title="Your account is not activated yet"
                onOk={retryActivate}
            />
            {userId &&
                <ActivateModal
                    key={"ActivateModal"}
                    open={openModalActivate}
                    setOpen={setOpenModalActivate}
                    id={userId}
                    email={userEmail}
                />
            }
            <Form {...form}>
                <fieldset className="border border-gray-300 rounded-md shadow-md p-6">
                    <legend >Sign in to Learning Hub </legend>
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
                        <Button type="submit" className="w-full">Sign in</Button>
                    </form>
                    <p className="mb-2 mt-3 active:underline hover:underline hover:cursor-pointer inline-block"
                        onClick={() => setOpenModalForgotPass(true)}>
                        Forgot password?
                    </p>
                    <Separator className="my-4" />
                    <p className="text-center">Or sign in with</p>
                    <div className="flex gap-6 items-center justify-center my-4">
                        <TooltipCustom
                            trigger={<FaGithub className="h-8 w-8"
                                onClick={() => signIn("github")}
                            />}
                            content="Sign in with Github"
                        />
                        <TooltipCustom
                            trigger={<FaGoogle className="h-8 w-8 text-red-600" />}
                            content="Sign in with Google"
                        />
                    </div>
                    <div className="text-center">
                        Don't have an account?
                        <Link href={'/sign-up'} className="hover:text-blue-600 hover:underline"> Sign up now</Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link className="hover:text-blue-600 hover:underline" href={'/'}>
                            Back to home
                        </Link>
                    </div>
                </fieldset>
            </Form>
        </>
    )
}

export default SignInForm