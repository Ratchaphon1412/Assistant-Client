import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetAccount } from '@/utils/api/internal/auth'  

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // check is logged in
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_CLIENT_URL || "/")
    }
    // check is account exists
    const [account,accountError] = await GetAccount()
    if (accountError !== undefined) {
        console.error("Account error:", accountError);
        return NextResponse.redirect(process.env.NEXT_PUBLIC_CLIENT_URL || "/")
    }

    if (!account === undefined) {
        console.error("Account not found");
        return NextResponse.redirect(process.env.NEXT_PUBLIC_CLIENT_URL || "/")
    }

  return NextResponse.next()
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/chat/:path*',
}