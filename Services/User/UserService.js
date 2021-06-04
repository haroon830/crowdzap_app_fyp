import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const LOGIN = CONSTANTS.API_URL.LOGIN
const REGISTER_USER = CONSTANTS.API_URL.REGISTER_USER
const GET_USER_Contacts = CONSTANTS.API_URL.GET_USER_Contacts
const ADD_USER_CONTACT = CONSTANTS.API_URL.ADD_USER_CONTACT


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

    getUserContacts() {
        return HTTP.get(GET_USER_Contacts)
    }

    addUserContact(data) {
        return HTTP.post(ADD_USER_CONTACT, data, {
            headers: {
                contentType: "application/json"
            }
        })
    }
}
