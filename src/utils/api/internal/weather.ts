import axiosInstance from '@/lib/request';
import { ResponseError } from "@/utils/api/type";

import axios from 'axios';

type CurrentWeatherResponse = {
    temp: number
    weather_name: string
    weather_description: string
    icon: string
    location_name: string
};
export type ForecastWeatherResponse = {
    temp: number
    weather_name: string
    weather_description: string
    icon: string
    date_txt: string
};

export async function getCurrentWeatherData(lat:string,long:string): Promise<[ CurrentWeatherResponse | undefined ,ResponseError | undefined]> {
    try {

        const response = await axiosInstance.get<CurrentWeatherResponse>('/api/v1/weather?lat='+lat + '&lon=' + long);
        
        return [response.data, undefined];
    }
    catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return [undefined, { message: err.response?.data, code: err.status || 500 }];
        } else {
            return [undefined, { message: "An unexpected error occurred", code: 500 }];
        }
    }
}

export async function getForecastWeatherData(lat:string,long:string): Promise<[ ForecastWeatherResponse[] | undefined ,ResponseError | undefined]> {
    try {

        const response = await axiosInstance.get<ForecastWeatherResponse[]>( '/api/v1/weather/forecast?lat='+lat + '&lon=' + long);
        
        return [response.data, undefined];
    }
    catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return [undefined, { message: err.response?.data, code: err.status || 500 }];
        } else {
            return [undefined, { message: "An unexpected error occurred", code: 500 }];
        }
    }
}