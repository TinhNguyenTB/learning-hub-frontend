"use server"

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: {
        name: string
        id: string
        email: string
        image: string
        role: string
        isActive: boolean
    },
    access_token: string
    refresh_token: string
}

const secretKet = process.env.SESSION_SECRET_KEY!
const encodeKey = new TextEncoder().encode(secretKet)

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d").sign(encodeKey)

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path: "/"
    })
}

export async function getSession() {
    const cookie = cookies().get("session")?.value
    if (!cookie) return null
    try {
        const { payload } = await jwtVerify(cookie, encodeKey, {
            algorithms: ["HS256"]
        })
        return payload as Session
    } catch (error) {
        console.error("Failed to verify the session", error)
        redirect("/sign-in")
    }
}

export async function deleteSession() {
    await cookies().delete("session")
}

export async function updateTokens({ access_token, refresh_token }: {
    access_token: string;
    refresh_token: string
}) {
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
        return null;
    }
    const { payload } = await jwtVerify<Session>(cookie, encodeKey);
    if (!payload) {
        throw new Error("Session not found")
    }
    const newPayload: Session = {
        user: {
            ...payload.user
        },
        access_token,
        refresh_token
    }
    await createSession(newPayload);
}