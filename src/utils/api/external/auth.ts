import axiosInstance from "@/lib/request";
import axios from 'axios';


export type GoogleCallBackCodeBody = {
    email : string
    profile : string
    token : string
}

export type GoogleCallBackCodeResponse = {
    code: number
    message: GoogleCallBackCodeBody
}

export type AccountBody ={
    email: string
    profile: string
}

export type AccountResponse = {
    code: number,
    message: AccountBody
}

export type ResponseError = {
    message: string;
    code: number;
}

export async function GoogleCallBackCode(code: string): Promise<[GoogleCallBackCodeResponse | undefined, ResponseError | undefined]> {
    
    try{

       const response = await axiosInstance.post<GoogleCallBackCodeBody>( "/api/v1/auth/google/callback",
        {
            code: code
        },
       )
        return [{
            code: response.status,
            message: {
                ...response.data,
            }
        }, undefined];
    }
    catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return [undefined, { message: err.message, code: err.status || 500 }];
        } else {
            return [undefined, { message: "An unexpected error occurred", code: 500 }];
        }
    }
  
}

export async function GetAccount(accessToken:string): Promise<[AccountResponse | undefined, ResponseError | undefined]> {
    try{
        
       const response = await axiosInstance.get<AccountBody>( "/api/v1/account",
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        }
       )
        return [{
            code: response.status,
            message: {
                ...response.data,
            }
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