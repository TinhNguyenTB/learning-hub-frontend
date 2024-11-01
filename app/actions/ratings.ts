import { sendRequest } from "@/lib/api"
import { Session } from "@/lib/session"

export const createNewRating = async (session: Session, courseId: string, quality: number, content: string) => {
    const res = await sendRequest<IBackendRes<IRating>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ratings`,
        method: 'POST',
        body: {
            quality,
            content,
            courseId,
            userId: session.user.id
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    return res;
}

export const getAllRatings = async (session: Session, courseId: string, current: number) => {
    const res = await sendRequest<IBackendRes<IModelPaginate<IRating>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ratings`,
        method: 'GET',
        queryParams: {
            current,
            courseId,
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    return res;
}