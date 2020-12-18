import { HTTP } from "../../config/HTTPService";

import CONSTANTS from "../../config/constants";

const GET_LISTED_PROPS = CONSTANTS.API_URL.GET_LISTED_PROPS

interface Query{
    nodeName: string;
}

export class ListedPropService {
    public getListedProps(query: Query) { 
        return HTTP.get(GET_LISTED_PROPS, {params: query})
    }
}
