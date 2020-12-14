import axios from "axios";
import LocalStore from "./localStore";
import {envConfig} from "./envConfig";

const localStore = new LocalStore();

export const HTTP = axios.create({
    baseURL: envConfig.API_URL,
    timeout: 60000,
});

HTTP.interceptors.request.use(
    (config)=>{
        config.headers.authorization = "Bearer "+localStore.getToken()
        return config
    },
    (error)=>{
        console.log(error)
    }
)

export const HTTP_CHAIN = axios.create({
    baseURL: envConfig.CHAIN_REST_API_URL,
    timeout: 60000,
});

HTTP_CHAIN.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        console.log(error)
    }
)