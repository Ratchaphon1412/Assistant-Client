
import axiosInstance from "@/lib/request";
import axios from 'axios';
import { ResponseError } from "@/utils/api/type";


export type AccountBody ={
    email: string
    profile: string
}






export async function GetAccount(): Promise<[AccountBody | undefined, ResponseError | undefined]> {
    const headerNext = await import ("next/headers");

    const cookieStore = await headerNext.cookies();
    const jwt = cookieStore.get('accessToken')?.value || "";
    try{  
       const response = await axiosInstance.get<AccountBody>("/api/v1/account",
        {
              headers: {
                "Cookie": `accessToken=${jwt}`,
              }
        }
       )
       console.log("Cookie:", jwt);
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

    try {
       
        const response =await axiosInstance.get("/api/v1/account/logout");
        console.log("Logout response:", response.data);
        if (response.status !== 200) {
            return false;
        }
        return true;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Logout error:", err.response?.data);
        } else {
            console.error("An unexpected error occurred during logout");
        }
        return false;
    }
}