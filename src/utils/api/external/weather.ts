import axiosInstance from '@/lib/request';
import { ResponseError } from "@/utils/api/type";

import axios from 'axios';

type CurrentWeatherResponse = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

type ForecastWeatherResponse = {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        visibility: number;
        pop: number;
        rain?: {
            '1h': number;
        };
        sys: {
            pod: string;
        };
        dt_txt: string;
    }>;
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

export async function getCurrentWeatherData(lat:string,long:string): Promise<[ CurrentWeatherResponse | undefined ,ResponseError | undefined]> {
    try {

        const response = await axiosInstance.get<CurrentWeatherResponse>(process.env.WEATHER_API_URL+'/data/2.5/weather?lat='+lat + '&lon=' + long 
            +"&units=metric"
            +"&lang=th"
            +"&appid=" + process.env.WEATHER_API_KEY
        );
        
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

export async function getForecastWeatherData(lat:string,long:string): Promise<[ ForecastWeatherResponse | undefined ,ResponseError | undefined]> {
    try {

        const response = await axiosInstance.get<ForecastWeatherResponse>(process.env.WEATHER_API_URL+'/data/2.5/forecast?lat='+lat + '&lon=' + long 
            +"&units=metric"
            +"&lang=th"
            +"&appid=" + process.env.WEATHER_API_KEY
        );
        
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