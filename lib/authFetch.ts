import { refreshToken } from "./auth";
import { getSession } from "./session";
import queryString from "query-string";


export const authFetch = async <T>(props: IRequest): Promise<IBackendRes<T>> => {
    const {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {},
    } = props;

    const session = await getSession();

    const authHeaders = new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
        ...headers,
    });

    let options: RequestInit = {
        method,
        headers: authHeaders,
        body: body ? JSON.stringify(body) : null,
        ...nextOption,
    };

    if (useCredentials) options.credentials = "include";

    let requestUrl = url;
    if (queryParams && Object.keys(queryParams).length) {
        requestUrl = `${url}?${queryString.stringify(queryParams)}`;
    }

    const fetchWithRetry = async (): Promise<IBackendRes<T>> => {
        const res = await fetch(requestUrl, options);
        const data = await res.json();

        if (res.ok) {
            return { data, statusCode: res.status, message: "Success" };
        }

        if (res.status === 401) {
            if (!session?.refresh_token) throw new Error("Refresh token not found");
            // Nếu lỗi 401 và có refresh token, thử làm mới token và gửi lại request.
            const newAccessToken = await refreshToken(session.refresh_token);
            if (!newAccessToken) {
                return { statusCode: 401, message: "Refresh token expired", error: "Unauthorized" };
            }

            // Cập nhật header với token mới và gửi lại request.
            authHeaders.set("Authorization", `Bearer ${newAccessToken}`);
            const retryRes = await fetch(requestUrl, { ...options, headers: authHeaders });
            const retryData = await retryRes.json();

            return {
                data: retryRes.ok ? retryData : undefined,
                statusCode: retryRes.status,
                message: retryData?.message ?? "An error occurred",
                error: !retryRes.ok ? retryData?.error ?? "Unknown error" : undefined,
            };
        }

        // Trả về lỗi nếu không phải lỗi 401 hoặc không thể làm mới token.
        return {
            statusCode: res.status,
            message: data?.message ?? "An error occurred",
            error: data?.error ?? "Unknown error",
        };
    };

    return fetchWithRetry();
};
