"use server"

import { sendRequest } from "@/lib/api"

export const getPublishedSection = async (courseId: string) => {
    const res = await sendRequest<IBackendRes<ISection[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections/published`,
        method: 'GET',
        queryParams: {
            courseId,
        }
    })
    if (res?.data) {
        return res.data
    }
    else {
        console.log(res.message)
    }
}

export const getPublishedSectionById = async (access_token: string, sectionId: string) => {
    const res = await sendRequest<IBackendRes<ISection>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sections/${sectionId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    if (res?.data) {
        return res.data
    }
    else {
        console.log(res.message)
    }
}