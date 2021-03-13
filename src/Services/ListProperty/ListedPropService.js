import { HTTP } from "Config/HTTPService";

import CONSTANTS from "Config/constants";

const GET_LISTED_PROPS = CONSTANTS.API_URL.GET_LISTED_PROPS


export class ListedPropService {
    getListedProps(query) {
        return HTTP.get(GET_LISTED_PROPS, {params: query})
    }
}
