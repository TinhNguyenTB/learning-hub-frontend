"use server"

import { sendRequest } from "@/lib/api"

export const getResourcesBySectionId = async (access_token: string, sectionId: string) => {
    const res = await sendRequest<IBackendRes<IResource[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resources`,
        method: 'GET',
        queryParams: {
            sectionId,
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    if (res?.data) {
        return res.data
    }
}