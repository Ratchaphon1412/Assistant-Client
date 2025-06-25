
import axiosInstance from "@/lib/request";
import axios from 'axios';
import "server-only"; // Ensure this file is treated as a server-only module
import { type AccountResponse,ResponseError } from "@/lib/api/external/auth";
import { cookies } from "next/headers";





export async function GetAccount(): Promise<[AccountResponse | undefined, ResponseError | undefined]> {

    const cookieStore = await cookies();
    const jwt = cookieStore.get('accessToken')?.value || "";
    try{  
       const response = await axiosInstance.get<AccountResponse>(process.env.NEXT_PUBLIC_CLIENT_URL+ "/api/v1/account",
        {
            headers: {
                Cookie: `accessToken=${jwt}`,
            }
        }
       )
        return [{
           ...response.data,
        }, undefined];
    }
    catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return [undefined, { message: err.response?.data, code: err.status || 500 }];
        } else {
            return [undefined, { message: "An unexpected error occurred", code: 500 }];
        }
    }
  
}

export async function Logout(): Promise<boolean> {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('accessToken')?.value || "";
    if (!jwt) {
        return false;
    }
    cookieStore.delete('accessToken');
    return true;
}