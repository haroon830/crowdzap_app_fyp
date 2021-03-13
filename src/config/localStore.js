const TOKEN = "TOKEN";
const USER_NAME = "USER_NAME";
const CLIENT_ID = "CLIENT_ID";
const USER_ID = "USER_ID";
const SERIALIZE_WALLET = "WALLET"

export default class LocalStore {

    setToken(tokenValue) {
        localStorage.setItem(TOKEN, tokenValue);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    clearToken() {
        localStorage.removeItem(TOKEN);
    }

    setUserName(userName) {
        localStorage.setItem(USER_NAME, userName);
    }

    getUserName() {
        return localStorage.getItem(USER_NAME);
    }

    setClientId(clientId) {
        localStorage.setItem(CLIENT_ID, clientId.toString().trim());
    }

    getClientId() {
        return localStorage.getItem(CLIENT_ID.trim());
    }

    clearClientId() {
        return localStorage.getItem(CLIENT_ID.trim());
    }

    setUserId(userId) {
        localStorage.setItem(USER_ID, userId);
    }

    getUserId() {
        return localStorage.getItem(USER_ID);
    }

    clearUserId() {
        return localStorage.removeItem(USER_ID);
    }

    setSerializedWallet(wallet){
        localStorage.setItem(SERIALIZE_WALLET, wallet)
    }

    getSerializedWallet(){
        return localStorage.getItem(SERIALIZE_WALLET)
    }

    removeToken(){
        localStorage.removeItem(TOKEN)
    }
}
