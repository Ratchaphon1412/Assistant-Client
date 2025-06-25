
import {  NextResponse } from "next/server"
import  { GetAccount } from "@/utils/api/external/auth";
import { cookies } from "next/headers";



export async function GET(){
    
    const cookieStore = await cookies();
    const jwt = cookieStore.get("accessToken")?.value;
    if (!jwt) {
        return NextResponse.json({ message: "No access token found" }, { status:401 });
    }
    
    const [responseAccount, errAccount] = await GetAccount(jwt);
    if (errAccount !== undefined) {
        return NextResponse.json({ message: errAccount.message,code: errAccount.code }, { status: errAccount.code });
    }
    return NextResponse.json({
        code: responseAccount?.code || 500,
        message: responseAccount?.message || { email: "", profile: "" }
    }, { status: responseAccount?.code || 500
    });

}