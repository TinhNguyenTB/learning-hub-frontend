'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { PlusCircle } from "lucide-react"
import FileUpload from "@/components/custom/FileUpload"

const formSchema = z.object({
    name: z.string().min(2, { message: "Title must be at least 2 characters" }),
    fileUrl: z.string().min(1, { message: "File is required" })
})

interface ResourceFormProps {
    section: ISection
    courseId: string
}

const ResourceForm = ({ section, courseId }: ResourceFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            fileUrl: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // const res = await axios.post(`/api/courses/${courseId}/sections`, values);
            // if (res.status === 200) {
            //     toast.success("New Section created!")
            //     router.push(`/instructor/courses/${courseId}/sections/${res.data.id}`);
            // }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Failed to create new section", error)
        }
    }

    return (
        <>
            <div className="flex items-center gap-2 text-xl font-semibold mt-12">
                <PlusCircle />
                Add Resources (optional)
            </div>
            <p className="text-sm font-medium mt-2">
                Add resources to this section to help student learn better.
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Textbook" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fileUrl"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Upload File</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value || ""}
                                        onChange={(url) => field.onChange(url)}
                                        endpoint="sectionResource"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Upload</Button>
                </form>
            </Form>
        </>
    )
}

export default ResourceForm