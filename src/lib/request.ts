import axios from "axios";
import 'server-only'

const axiosInstance = axios.create({
    baseURL: process.env.ENDPOINT_URL || "http://localhost:3000",
    headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


export default axiosInstance;