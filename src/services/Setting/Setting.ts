import CONSTANTS from "../../config/constants";
import Axios from "axios";
import { HTTP } from "../../config/HTTPService";

const CLOUD_URL = CONSTANTS.CLOUD.CLOUD_URL
export default class SettingService {
    
    public uploadImage(image: Object) {
        return Axios.post(CLOUD_URL, image, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }


    public postKYC(data:any){
        return HTTP.post(CONSTANTS.API_URL.POST_KYC, data,{
            headers: {
                contentType: "application/json"
            }
        })
    }
}