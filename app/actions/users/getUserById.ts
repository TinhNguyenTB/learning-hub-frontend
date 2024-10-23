import { sendRequest } from "@/lib/api"
import { IUser } from "@/lib/session"


const getUserById = async (id: string) => {
    const res = await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
        method: 'GET',

    })
    if (res?.data) {
        return res.data
    }
}

export default getUserById