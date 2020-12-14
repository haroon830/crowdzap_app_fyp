import { HTTP } from "../../config/HTTPService";
import { UserModal } from "../../model/UserModal";

import CONSTANTS from "../../config/constants";

const LOGIN = CONSTANTS.API_URL.LOGIN
const REGISTER_USER = CONSTANTS.API_URL.REGISTER_USER

export default class AuthService {
    public logIn(loginDataModel: UserModal) {
        return HTTP.post(LOGIN, loginDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    public signUp(registerUserModel: UserModal) {
        return HTTP.post(REGISTER_USER, registerUserModel, {
            headers: {
                contentType: "application/json"
            }
        })
    }
}
