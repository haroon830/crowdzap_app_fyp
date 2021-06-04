import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const ADD_NEW_INVESTMENT = CONSTANTS.API_URL.ADD_NEW_INVESTMENT
const GET_NEW_INVESTMENT = CONSTANTS.API_URL.GET_NEW_INVESTMENT
const TRANSFER_INVESTMENT = CONSTANTS.API_URL.TRANSFER_INVESTMENT

export class InvestmentPortfolioService {
    addNewInvestment(data) {
        return HTTP.post(ADD_NEW_INVESTMENT,  data, {
            headers: {
                contentType: "application/json"
            }
        })
    }

    transferInvestment(data) {
        return HTTP.post(TRANSFER_INVESTMENT,  data, {
            headers: {
                contentType: "application/json"
            }
        })
    }

    getUserInvestments() {
        return HTTP.get(GET_NEW_INVESTMENT)
    }
}