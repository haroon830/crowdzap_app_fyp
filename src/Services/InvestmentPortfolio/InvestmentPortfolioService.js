import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const ADD_NEW_INVESTMENT = CONSTANTS.API_URL.ADD_NEW_INVESTMENT


export class InvestmentPortfolioService {
    addNewInvestment(data) {
        return HTTP.post(ADD_NEW_INVESTMENT,  data, {
            headers: {
                contentType: "application/json"
            }
        })
    }
}