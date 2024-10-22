"use server"

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

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await sendRequest<IBackendRes<Session>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
            method: "POST",
            body: {
                refresh: oldRefreshToken
            }
        })
        if (!response.data) {
            throw new Error("Failed to refresh token " + response.message)
        }
        const { access_token, refresh_token } = response.data;
        // update session with new tokens
        const updateRes = await fetch("http://localhost:3000/api/auth/update-tokens", {
            method: "POST",
            body: JSON.stringify({
                access_token,
                refresh_token
            })
        })
        if (!updateRes.ok) {
            throw new Error("Failed to update the tokens")
        }
        return access_token
    } catch (error) {
        console.log("Refresh token failed", error);
        return null
    }
}