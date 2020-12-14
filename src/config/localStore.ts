const TOKEN = "TOKEN";
const USER_NAME = "USER_NAME";
const CLIENT_ID = "CLIENT_ID";
const USER_ID = "USER_ID";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export default class LocalStore {

    setToken(tokenValue: string) {
        localStorage.setItem(TOKEN, tokenValue);
    }

    setRefreshToken(refreshTokenValue: string){
        localStorage.setItem(REFRESH_TOKEN, refreshTokenValue)
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    setUserName(userName: string) {
        localStorage.setItem(USER_NAME, userName);
    }

    getUserName() {
        return localStorage.getItem(USER_NAME);
    }

    setClientId(clientId: string) {
        localStorage.setItem(CLIENT_ID, clientId.toString().trim());
    }

    getClientId() {
        return localStorage.getItem(CLIENT_ID.trim());
    }

    setUserId(userId: string) {
        localStorage.setItem(USER_ID, userId);
    }

    getUserId() {
        return localStorage.getItem(USER_ID);
    }

    removeToken(){
        localStorage.removeItem(TOKEN)
    }
}
