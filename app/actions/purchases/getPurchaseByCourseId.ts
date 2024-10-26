"use server"

import { sendRequest } from "@/lib/api";
import { Session } from "@/lib/session";

const getPurchaseByCourseId = async (courseId: string, session: Session) => {
    const res = await sendRequest<IBackendRes<IPurchase>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/purchases/${courseId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    });
    if (res.data) {
        return res.data
    }
}

export default getPurchaseByCourseId