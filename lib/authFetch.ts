import { refreshToken } from "./auth";
import { getSession } from "./session"

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>
}

export const authFetch = async (url: string | URL, options: FetchOptions = {}) => {
    const session = await getSession();

    options.headers = {
        ...options.headers,
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        if (!session?.refresh_token) throw new Error("Refresh token not found");

        const newAccessToken = await refreshToken(session.refresh_token);
        if (newAccessToken) {
            options.headers.Authorization = `Bearer ${newAccessToken}`
            response = await fetch(url, options)
        }
    }
    return response;
}