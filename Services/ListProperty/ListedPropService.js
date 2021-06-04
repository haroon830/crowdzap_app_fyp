import { HTTP, HTTP_CHAIN } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const GET_LISTED_PROPS = CONSTANTS.API_URL.GET_LISTED_PROPS
const ADD_NEW_LISTED_PROPS = CONSTANTS.API_URL.ADD_NEW_LISTED_PROPS
const GET_BASIC_CONTRACT_BY_ID = CONSTANTS.CHAIN_API_URLS.GET_BASIC_CONTRACT_BY_ID




export class ListedPropService {
    getListedProps(query) {
        return HTTP.get(GET_LISTED_PROPS, {params: query})
    }

    getContracDetailFromChain(contractId) {
        return HTTP_CHAIN.get(GET_BASIC_CONTRACT_BY_ID+contractId)
    }

    addNewListedProps(propDetail) {
        return HTTP.post(ADD_NEW_LISTED_PROPS, propDetail, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
}
