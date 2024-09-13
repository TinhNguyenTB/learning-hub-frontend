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
import { Combobox } from "@/components/custom/ComboBox"
import { useRouter } from "next/navigation"
import { sendRequest } from "@/lib/api"
import toast from "react-hot-toast"
import { Session } from "next-auth"

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
    categoryId: z.string().min(2, { message: "Category is required" }),
    subCategoryId: z.string().min(2, { message: "SubCategory is required" }),
})

interface CreateCourseFormProps {
    categories: {
        value: string; // categoryId
        label: string; // name of category
        subCategories: {
            value: string; // subCategoryId
            label: string; // name of subCategory
        }[]
    }[]
    session: Session
}

const CreateCourseForm = ({ categories, session }: CreateCourseFormProps) => {
    console.log(categories)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            subCategoryId: ""
        },
    })

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await sendRequest<IBackendRes<ICourse>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
                method: 'POST',
                body: {
                    title: values.title,
                    categoryId: values.categoryId,
                    subCategoryId: values.subCategoryId,
                },
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            })
            if (res?.data) {
                router.push(`/instructor/courses/${res.data.id}/basic`)
                toast.success("New Course Created")
            }
            else if (res?.error) {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Create new course error:", error)
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-xl font-semibold">Let give some basics for your course</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 w-1/2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your course title here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Combobox options={categories} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subCategoryId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>SubCategory</FormLabel>
                                <FormControl>
                                    <Combobox
                                        options={categories.find(category => category.value === form.watch('categoryId'))?.subCategories || []}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCourseForm
