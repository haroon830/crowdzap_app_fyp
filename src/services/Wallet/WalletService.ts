import { HTTP } from "../../config/HTTPService";

import CONSTANTS from "../../config/constants";

const GET_ADDRESSES = CONSTANTS.API_URL.GET_ADDRESSES
const ADD_NEW_ADDRESSES = CONSTANTS.API_URL.ADD_NEW_ADDRESSES
const PLACE_CRYPTO_ORDER = CONSTANTS.API_URL.PLACE_CRYPTO_ORDER

export class WalletService {
    public getAddresses() { 
        return HTTP.get(GET_ADDRESSES)
    }

    public addNewAddress(address: any) {
        return HTTP.post(ADD_NEW_ADDRESSES, address,{
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    public placeCryptoOrder(order: any) {
        return HTTP.post(PLACE_CRYPTO_ORDER, order,{
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
}
