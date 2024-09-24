"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FileUpload from "@/components/custom/FileUpload"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import ResourceForm from "@/components/sections/ResourceForm"
import ReactPlayer from 'react-player/lazy'
import { useRef } from "react"
import { Session } from "next-auth"
import { sendRequest } from "@/lib/api"
import { useHasMounted } from "@/lib/customHook"
import Delete from "@/components/custom/Delete"

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    isFree: z.boolean().optional()
})

interface EditSectionFormProps {
    section: ISection
    courseId: string
    isCompleted: boolean
    session: Session
}

const EditSectionForm = ({ section, courseId, isCompleted, session }: EditSectionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: section.title,
            description: section.description || "",
            videoUrl: section.videoUrl || "",
            isFree: section.isFree || false
        },
    })

    const router = useRouter();
    const { isValid, isSubmitting } = form.formState
    const videoRef = useRef<ReactPlayer | null>(null);
    const isUploadedVideo = form.getValues("videoUrl");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { title, description, videoUrl, isFree } = values
            const res = await sendRequest<IBackendRes<ISection>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections/${section.id}`,
                method: 'PATCH',
                body: {
                    courseId,
                    title,
                    description,
                    videoUrl,
                    videoDuration: videoRef?.current?.getDuration()
                },
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            })
            if (res?.data) {
                toast.success("Section Updated!")
                router.refresh()
            }

        } catch (error) {
            console.log("Failed to update the section", error);
            toast.error("Something went wrong")
        }
    }

    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return <></>
    }

    return (
        <div className="py-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
                <Link href={`/instructor/courses/${courseId}/sections`}>
                    <Button variant={'outline'} className="text-sm font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to curriculum
                    </Button>
                </Link>
                <div className="flex gap-4 items-start">
                    <Button variant={'outline'}>Publish</Button>
                    <Delete
                        item="section"
                        session={session}
                        courseId={courseId}
                        sectionId={section.id}
                    />
                </div>
            </div>

            <h1 className="text-xl font-semibold">Section Detail</h1>
            <p className="text-sm font-medium mt-2">
                Complete this section with detailed information, good video and
                resources to give your students the best learning experience
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="What is this section about?" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Video</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value || ""}
                                        onChange={(url) => field.onChange(url)}
                                        endpoint="sectionVideo"
                                        page="Edit Section"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="my-5">
                        {section.videoUrl ?
                            <ReactPlayer
                                url={section?.videoUrl}
                                className="md:max-w-[600px]"
                                ref={videoRef}
                                controls
                            />
                            :
                            isUploadedVideo ?
                                <ReactPlayer
                                    url={form.getValues("videoUrl")}
                                    className="md:max-w-[600px]"
                                    ref={videoRef}
                                    controls
                                />
                                :
                                <></>
                        }
                    </div>
                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Accessibility</FormLabel>
                                    <FormDescription>
                                        Everyone can access this section for FREE
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-5">
                        <Link href={`/instructor/courses/${courseId}/sections`}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting ?
                                <Loader2 className="h-4 w-4 animate-spin" />
                                :
                                "Save"
                            }
                        </Button>
                    </div>
                </form>
            </Form>

            <ResourceForm
                section={section}
                courseId={courseId}
            />
        </div>
    )
}

export default EditSectionForm