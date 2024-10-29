"use server"

import { sendRequest } from "@/lib/api"
import { Session } from "@/lib/session"

export const getProgressByStudentId = async (access_token: string, studentId: string, sectionId: string) => {
    const res = await sendRequest<IBackendRes<IProgress>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/progress`,
        method: 'GET',
        queryParams: {
            studentId,
            sectionId
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    if (res?.data) {
        return res.data
    }
    else if (res.error) {
        console.log(res)
    }
}

export const getCompletedProgress = async (session: Session, studentId: string, publishedSectionsId: string[]) => {
    const res = await sendRequest<IBackendRes<number>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/progress/count-completed`,
        method: 'POST',
        body: {
            studentId,
            publishedSectionsId
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`
        }
    })
    if (res?.data) {
        return res.data
    }
    else if (res.error) {
        console.log(res)
    }
}