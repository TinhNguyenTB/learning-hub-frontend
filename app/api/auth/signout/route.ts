import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await cookies().delete("session")

    revalidatePath("/", 'layout');
    revalidatePath("/", 'page');
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
}