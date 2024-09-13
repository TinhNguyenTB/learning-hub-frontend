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

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
    subtitle: z.string().optional(),
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
}

const EditCourseForm = ({ course, categories, levels }: EditCourseFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title,
            subtitle: course.subTitle || "",
            description: course.description || "",
            categoryId: course.categoryId,
            subCategoryId: course.subCategoryId,
            levelId: course.levelId || "",
            imageUrl: course.imageUrl || "",
            price: course.price || undefined
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }

    return (
        <div>
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
                        name="subtitle"
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditCourseForm