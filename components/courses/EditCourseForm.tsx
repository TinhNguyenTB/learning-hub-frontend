"use client"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import RichEditor from "@/components/custom/RichEditor"
import { Combobox } from "@/components/custom/ComboBox"
import FileUpload from "@/components/custom/FileUpload"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"
import { sendRequest } from "@/lib/api"
import { Session } from "next-auth"

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
    subTitle: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().min(2, { message: "Category is required" }),
    subCategoryId: z.string().min(2, { message: "SubCategory is required" }),
    levelId: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.coerce.number().optional(),
})

interface EditCourseFormProps {
    course: ICourse;
    categories: {
        value: string; // categoryId
        label: string; // name of category
        subCategories: {
            value: string; // subCategoryId
            label: string; // name of subCategory
        }[]
    }[];
    levels: {
        value: string; // levelId
        label: string; // name of level
    }[]
    session: Session
}

const EditCourseForm = ({ course, categories, levels, session }: EditCourseFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title,
            subTitle: course.subTitle || "",
            description: course.description || "",
            categoryId: course.categoryId,
            subCategoryId: course.subCategoryId,
            levelId: course.levelId || "",
            imageUrl: course.imageUrl || "",
            price: course.price || undefined
        },
    })

    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        { label: "Basic Information", path: `/instructor/courses/${course.id}` },
        { label: 'Curriculum', path: `/instructor/courses/${course.id}/sections` }
    ]

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await sendRequest<IBackendRes<ICourse>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${course.id}`,
                method: 'PATCH',
                body: {
                    ...values
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success("Course Updated!")
                router.refresh()
            }
            else if (res.error) {
                toast.error(res.message)
            }
        } catch (error) {
            console.log("Failed to update the course", error);
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="py-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
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
                <div className="flex gap-4 items-start">
                    <Button variant={'outline'}>Publish</Button>
                    <Button variant={'default'} className="bg-red-500 hover:bg-red-600">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subtitle</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your course subtitle here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <RichEditor
                                        placeholder="What is this course about?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-wrap gap-10">
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
                        <FormField
                            control={form.control}
                            name="levelId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <Combobox options={levels} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: 22.8" {...field}
                                        type="number"
                                        step={"0.01"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Course Banner</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value || ""}
                                        onChange={(url) => field.onChange(url)}
                                        endpoint="courseBanner"
                                        page="Edit Course"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-5">
                        <Link href={"/instructor/courses"}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditCourseForm