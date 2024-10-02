import { sendRequest } from "@/lib/api"

const getCoursesByCategory = async (categoryId: string | null) => {

    const res = await sendRequest<IBackendRes<IModelPaginate<ICourse>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
        method: 'GET',
        queryParams: {
            categoryId,

        }
    })
    if (res?.data) {
        return {
            courses: res.data.result,
            current: res.data.meta.current,
            pageSize: res.data.meta.pageSize,
            total: res.data.meta.total,
            pages: res.data.meta.pages
        }
    }
}

export default getCoursesByCategory