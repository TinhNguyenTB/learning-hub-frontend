import { getSession } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const session = await getSession()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    return { userId: session.user.id };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseBanner: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(() => { }),
    sectionVideo: f({ video: { maxFileSize: "16GB", maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(() => { }),
    sectionResource: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(() => { }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;