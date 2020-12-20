import { HTTP } from "../../config/HTTPService";

import CONSTANTS from "../../config/constants";

const GET_ADDRESSES = CONSTANTS.API_URL.GET_ADDRESSES
const ADD_NEW_ADDRESSES = CONSTANTS.API_URL.ADD_NEW_ADDRESSES

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
}
