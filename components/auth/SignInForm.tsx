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
    }

    return (
        <Form {...form}>
            <fieldset className="border border-gray-300 rounded-lg p-6">
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
                    <Link className="hover:text-blue-600 hover:underline" href={'/'} >Back to home</Link>
                </div>
            </fieldset>
        </Form>
    )
}

export default SignInForm