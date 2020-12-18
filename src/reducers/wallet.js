import CONSTANTS from "../config/constants";

const initialState = {
        addresses : [],
        tried : false,
};
/***************/
/***Actions****/
/*************/
export const setAddresses = (payload) => {
  return {
      type: CONSTANTS.LISTED_PROPS.SET_LISTED_PROPS,
      payload: payload
  };
};

export const fetchAddressesFailed = () => {
    return {
        type: CONSTANTS.LISTED_PROPS.FAILED_TO_GET,
        payload: null
    };
};

export const addNewAddress = (payload) => {
    return {
        type: CONSTANTS.WALLET.ADD_NEW_KEY,
        payload: payload
    };
};

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.WALLET.SET_KEYS:
      return {
        addresses  : action.payload.addresses,
        tried : true,
    };
    case CONSTANTS.WALLET.FAILED_TO_GET:
      return {
        tried : true,
      };
    case CONSTANTS.WALLET.ADD_NEW_KEY:
    return {
        addresses : state.addresses.concat(action.payload)
    };
    default:
      return state;
  }
}