import { sendRequest } from "@/lib/api"


const getPublishedSection = async (courseId: string) => {
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
}

export default getPublishedSection