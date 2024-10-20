import { sendRequest } from "@/lib/api";
import { createSession, Session } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
    const response = await sendRequest<IBackendRes<Session>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        method: 'POST',
        body: {
            email,
            password
        }
    })
    if (response.data) {
        const { user, access_token, refresh_token } = response.data;
        // create the session for authentication user
        await createSession({
            user,
            access_token,
            refresh_token
        })
        redirect("/")
    }
    else {
        return {
            message: response.statusCode === 401 ? "Invalid Credential" : response.message
        }
    }
}