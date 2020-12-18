import { HTTP } from "../../../config/HTTPService";

import CONSTANTS from "../../../config/constants";

const CRYPTO_ORDERS = CONSTANTS.API_URL.ADMIN.GET_CRYPTO_ORDERS

interface Query{
    nodeName: string;
}
export default class CryptoOrderService {
    public getCryptoOrders(query: Query) { 
        return HTTP.get(CRYPTO_ORDERS, {params: query})
    }
}
