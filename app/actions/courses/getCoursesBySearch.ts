import { sendRequest } from "@/lib/api"

const getCourseBySearch = async (search?: string | null, current?: string, pageSize?: string) => {

    const res = await sendRequest<IBackendRes<IModelPaginate<ICourse>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
        method: 'GET',
        queryParams: {
            search,
            current,
            pageSize
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

export default getCourseBySearch