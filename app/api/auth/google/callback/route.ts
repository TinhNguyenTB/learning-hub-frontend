import { createSession } from "@/lib/session";
// import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const image = searchParams.get("image");
    const isActive = searchParams.get("isActive");
    const role = searchParams.get("role");

    if (!accessToken || !refreshToken || !userId || !name || !email || !image || !isActive || !role) {
        throw new Error("Google Oauth Failed")
    }

    await createSession({
        user: {
            id: userId,
            name: name,
            email: email,
            image: image,
            isActive: Boolean(isActive),
            role: role
        },
        access_token: accessToken,
        refresh_token: refreshToken
    })

    redirect("/")
}