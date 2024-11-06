"use server"

import { sendRequest } from "@/lib/api"

export const getCourseByIdForStudent = async (courseId: string) => {
    const res = await sendRequest<IBackendRes<ICourse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${courseId}/published`,
        method: 'GET',
    })
    if (res?.data) {
        return res.data
    }
}

export const getCoursesByCategory = async (categoryId: string | null, current?: string, pageSize?: string) => {

    const res = await sendRequest<IBackendRes<IModelPaginate<ICourse>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
        method: 'GET',
        queryParams: {
            categoryId,
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

export const getCourseBySearch = async (search?: string | null, current?: string, pageSize?: string) => {
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

export const getFeaturedCourses = async () => {
    const res = await sendRequest<IBackendRes<ICourse[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/featured`,
        method: 'POST',
    })
    if (res?.data) {
        return res.data
    }
    console.log(res)
}