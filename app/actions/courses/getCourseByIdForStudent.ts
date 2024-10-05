import { sendRequest } from "@/lib/api"


const getCourseByIdForStudent = async (courseId: string) => {
    const res = await sendRequest<IBackendRes<ICourse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${courseId}/published`,
        method: 'GET',

    })
    if (res?.data) {
        return res.data
    }
}

export default getCourseByIdForStudent