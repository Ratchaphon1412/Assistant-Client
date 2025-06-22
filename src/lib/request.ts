import axios from "axios";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: process.env.ENDPOINT_URL,
    headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
})


export default axiosInstance;