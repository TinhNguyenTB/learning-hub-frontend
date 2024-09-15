'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import toast from "react-hot-toast"
import { sendRequest } from "@/lib/api"
import { Session } from "next-auth"
import SectionList from "@/components/sections/SectionList"


const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
})


const CreateSectionForm = ({ course, session }: { course: ICourse; session: Session }) => {
    const pathname = usePathname();
    const router = useRouter();
    const routes = [
        { label: "Basic Information", path: `/instructor/courses/${course.id}/basic` },
        { label: 'Curriculum', path: `/instructor/courses/${course.id}/sections` }
    ]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await sendRequest<IBackendRes<ISection>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections`,
                method: 'POST',
                body: {
                    title: values.title,
                    courseId: course.id,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success("New Section created")
                router.push(`/instructor/courses/${course.id}/sections/${res.data.id}`);
            }
            else if (res?.error) {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Failed to create new section", error)
        }
    }

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections/reorder`,
                method: 'PUT',
                body: {
                    list: updateData,
                    courseId: course.id,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success(res.data.message)
            }
            else if (res?.error) {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Failed to reorder sections", error)
        }
    }

    return (
        <div className="px-10 py-6">
            <div className="flex gap-5">
                {routes.map(item => {
                    return (
                        <Link href={item.path} key={item.path}
                            className="flex gap-4"
                        >
                            <Button
                                variant={pathname === item.path ? 'default' : 'outline'}>
                                {item.label}
                            </Button>
                        </Link>
                    )
                })}
            </div>
            <SectionList
                items={course.sections || []}
                onReorder={onReorder}
                onEdit={(id) => router.push(`/instructor/courses/${course.id}/sections/${id}`)}
            />
            <h1 className="text-xl font-semibold mt-5">Add New Section</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Introduction" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-5">
                        <Link href={`/instructor/courses/${course.id}/basic`}>
                            <Button type="button" variant={'outline'}>Cancel</Button>
                        </Link>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateSectionForm
