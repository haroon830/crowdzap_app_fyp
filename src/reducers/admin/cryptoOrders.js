import CONSTANTS from "../../config/constants";

const initialState = {
  tried : false,
  orders : null
};
/***************/
/***Actions****/
/*************/
export const fetchOrderFailed = () => {
  return {
      type: CONSTANTS.ADMIN.CRYPTO_ORDERS.FETCH,
      payload: null
  };
};

export const setCryptoOrders = (cryptoOrders) => {
  console.log(cryptoOrders)
    return {
        type: CONSTANTS.ADMIN.CRYPTO_ORDERS.SET_CRYPTO_ORDERS,
        payload: cryptoOrders
    };
  }

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.ADMIN.CRYPTO_ORDERS.FETCH:
      return {
        ...state,
        tried : !state.tried
      };
    case CONSTANTS.ADMIN.CRYPTO_ORDERS.SET_CRYPTO_ORDERS:
    return {
        tried : true,
        orders : action.payload
    };  
    default:
      return state;
  }
}