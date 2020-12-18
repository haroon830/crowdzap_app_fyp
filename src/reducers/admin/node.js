import CONSTANTS from "../../config/constants";

const initialState = {
    nodeName : 'abdul waheed',
    publicAddress : ""
}

/***************/
/***Actions****/
/*************/

  
/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
switch (action.type) {
    case CONSTANTS.ADMIN.ADMIN_CONFIG.SET_CONFIG:
    return {
        nodeName : state.nodeName,
        publicAddress : state.publicAddress
    }
    default:
    return state;
}
}