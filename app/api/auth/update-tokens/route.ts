import { updateTokens } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { access_token, refresh_token } = body;
    if (!access_token || !refresh_token) {
        return new Response("Provide Tokens", { status: 401 })
    }

    await updateTokens({ access_token, refresh_token })

    return new Response("Ok", { status: 200 })
}