"use server"

import { sendRequest } from "@/lib/api"

export const getLevelById = async (id: string) => {
    const res = await sendRequest<IBackendRes<ILevel>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/levels/${id}`,
        method: 'GET',

    })
    if (res?.data) {
        return res.data
    }
}
