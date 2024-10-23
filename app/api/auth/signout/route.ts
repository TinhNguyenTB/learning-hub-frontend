import { authFetch } from "@/lib/authFetch";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = await authFetch<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signout`,
        method: "POST",
    })
    if (response.data) {
        await deleteSession();
    }

    revalidatePath("/", 'layout');
    revalidatePath("/", 'page');
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
}