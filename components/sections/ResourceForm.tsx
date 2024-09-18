'use client'

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
import { File, PlusCircle, X, Loader2 } from "lucide-react"
import FileUpload from "@/components/custom/FileUpload"
import { sendRequest } from "@/lib/api"
import { useSession } from "next-auth/react"
import { useState } from "react"
import ConfirmModal from "@/components/custom/ConfirmModal"

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
    const { data: session } = useSession();
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [resourceId, setResourceId] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            fileUrl: ""
        },
    })

    const { isValid, isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await sendRequest<IBackendRes<IResource>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resources`,
                method: 'POST',
                body: {
                    name: values.name,
                    fileUrl: values.fileUrl,
                    courseId: courseId,
                    sectionId: section.id
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success("New Resource Uploaded!")
                form.reset()
                router.refresh()
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Failed to upload resource", error)
        }
    }

    async function onDelete() {
        try {
            const res = await sendRequest<IBackendRes<IResource>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resources/${resourceId}`,
                method: 'DELETE',
                body: {
                    sectionId: section.id
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                }
            })
            if (res?.data) {
                toast.success("Resource deleted!")
                router.refresh()
                setOpenConfirmModal(false)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Failed to delete resource", error)
        }
    }

    return (
        <>
            <ConfirmModal
                key={"DeleteResource"}
                open={openConfirmModal}
                setOpen={setOpenConfirmModal}
                title="Are you sure to delete this resource?"
                onOk={onDelete}
            />
            <div className="flex items-center gap-2 text-xl font-semibold mt-12">
                <PlusCircle />
                Add Resources (optional)
            </div>
            <p className="text-sm font-medium mt-2">
                Add resources to this section to help student learn better.
            </p>

            <div className="mt-5 flex flex-col gap-5">
                {section.resources.map(resource => (
                    <div className="flex justify-between bg-[#F5F5F5] rounded-lg text-sm font-medium p-3">
                        <div className="flex items-center">
                            <File className="h-4 w-4 mr-4" />
                            {resource.name}
                        </div>
                        <button className="text-red-500" disabled={isSubmitting}
                            onClick={() => {
                                setResourceId(resource.id)
                                setOpenConfirmModal(true)
                            }}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
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
                                            page="Edit Section"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting ?
                                <Loader2 className="h-4 w-4 animate-spin" />
                                :
                                "Upload"
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default ResourceForm