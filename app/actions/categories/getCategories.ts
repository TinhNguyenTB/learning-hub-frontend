import { sendRequest } from "@/lib/api"

const getCategories = async () => {
    const res = await sendRequest<IBackendRes<ICategory[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: 'GET',

    })
    if (res?.data) {
        return res.data
    }
}

export default getCategories