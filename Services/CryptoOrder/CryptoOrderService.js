import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const PLACE_CRYPTO_ORDER = CONSTANTS.API_URL.PLACE_CRYPTO_ORDER
const PROCESS_CRYPTO_ORDER = CONSTANTS.API_URL.PROCESS_CRYPTO_ORDER
const GET_CRYPTO_ORDERS = CONSTANTS.API_URL.GET_CRYPTO_ORDERS
const GET_STRIPE_TOKEN= CONSTANTS.API_URL.GET_STRIPE_TOKEN

export default class CryptoOrderService {
    getCryptoOrder() {
        return HTTP.get(GET_CRYPTO_ORDERS, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    getStripeToken(amount) {
        return HTTP.get(GET_STRIPE_TOKEN+"?amount="+amount, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    placeCryptoOrder(order) {
        return HTTP.post(PLACE_CRYPTO_ORDER, order, {
            headers: {
                contentType: "application/json"
            }
        })
    }

    processCryptoOrder(orderID) {
        return HTTP.post(PROCESS_CRYPTO_ORDER, orderID, {
            headers: {
                contentType: "application/json"
            }
        })
    }
}
