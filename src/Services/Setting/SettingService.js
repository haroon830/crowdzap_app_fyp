import CONSTANTS from "Config/constants";
import Axios from "axios";
import { HTTP } from "Config/HTTPService";

const CLOUD_URL = CONSTANTS.CLOUD.CLOUD_URL
export default class SettingService {
    
    uploadImage(image) {
        return Axios.post(CLOUD_URL, image, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }


    postKYC(data){
        return HTTP.post(CONSTANTS.API_URL.POST_KYC, data,{
            headers: {
                contentType: "application/json"
            }
        })
    }
}