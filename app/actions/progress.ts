"use server"

import { sendRequest } from "@/lib/api"

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
}