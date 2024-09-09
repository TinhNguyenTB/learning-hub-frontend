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

const formSchema = z.object({
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

    async function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
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
                                    <Input placeholder="Type your password here..." {...field} type="password" />
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
                                    <Input placeholder="Type your confirm password here..." {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Sign up</Button>
                    <Separator />
                    <p className="text-center">Or sign up with</p>
                    <div className="flex gap-6 items-center justify-center">
                        <TooltipCustom
                            trigger={<FaGithub className="h-8 w-8" />}
                            content="Sign up with Github"
                        />
                        <TooltipCustom
                            trigger={<FaGoogle className="h-8 w-8 text-red-600" />}
                            content="Sign up with Google"
                        />
                    </div>
                    <div className="text-center">
                        Already have an account?
                        <Link href={'/sign-in'} className="hover:text-blue-600"> Sign in now</Link>
                    </div>
                </form>
            </fieldset>
        </Form>
    )
}

export default SignUpForm