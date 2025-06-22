

import { NextRequest, NextResponse } from "next/server"
import { redirect } from 'next/navigation'
import { GoogleCallBackCode } from "@/lib/api/external/auth"
import { cookies } from "next/headers";

export async function GET(request:NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
       redirect(process.env.NEXT_PUBLIC_CLIENT_URL + "/");
    }

    const [ res ,err ] = await GoogleCallBackCode(code)
    if (err !== undefined) {
        return redirect(process.env.NEXT_PUBLIC_CLIENT_URL + "/?error=" + encodeURIComponent(err.message));
    }
    if (res === undefined) {
        return NextResponse.json({ error: "No response from Google CallBack" }, { status: 500 });
    }
    // set cookie httpOnly
    const cookieStore = await cookies();
    cookieStore.set({
            name: "accessToken",
            value: res.message.token,
            httpOnly: true,
            secure: false, // ควรเป็น true บน production (HTTPS)
            sameSite: "lax", // หรือ "none" ถ้า cross-site 
            maxAge: 60 * 60 * 24, // 1 วัน
            path: "/",
        }
    )
    return redirect(process.env.NEXT_PUBLIC_CLIENT_URL + "/chat");

}