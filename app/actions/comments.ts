import { sendRequest } from "@/lib/api"
import { Session } from "@/lib/session"

export const createNewComment = async (session: Session, courseId: string, userId: string, content: string, parentId?: string) => {
    const res = await sendRequest<IBackendRes<IComment>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
        method: 'POST',
        body: {
            userId,
            content,
            courseId,
            parentId
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    return res;
}

export const getAllComments = async (session: Session, courseId: string, current: number) => {
    const res = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
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

export const deleteComment = async (session: Session, id: string) => {
    const res = await sendRequest<IBackendRes<IComment>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    return res;
}