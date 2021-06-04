import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const GET_ADDRESSES = CONSTANTS.API_URL.GET_ADDRESSES
const ADD_NEW_ADDRESSES = CONSTANTS.API_URL.ADD_NEW_ADDRESSES
const PLACE_CRYPTO_ORDER = CONSTANTS.API_URL.PLACE_CRYPTO_ORDER

export class WalletService {
    getAddresses() {
        return HTTP.get(GET_ADDRESSES)
    }

    addNewAddress(address) {
        return HTTP.post(ADD_NEW_ADDRESSES, address,{
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    placeCryptoOrder(order) {
        return HTTP.post(PLACE_CRYPTO_ORDER, order,{
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
}
