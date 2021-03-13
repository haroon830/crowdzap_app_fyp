import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const LOGIN = CONSTANTS.API_URL.LOGIN
const REGISTER_USER = CONSTANTS.API_URL.REGISTER_USER

export default class UserService {
     logIn(loginDataModel) {
        return HTTP.post(LOGIN, loginDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

     signUp(registerUserModel) {
        return HTTP.post(REGISTER_USER, registerUserModel, {
            headers: {
                contentType: "application/json"
            }
        })
    }
}
