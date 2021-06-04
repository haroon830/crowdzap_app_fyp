import CONSTANTS from "Config/constants";

const initialState = {
    cryptoOrders : [],
    loadingOrders : false,
    tried: false,
    addedOrderStatus: false,
    processingOrder: false,
    error : null,
    processingError : null
};
/***************/
/***Actions****/
/*************/
export const loadingCryptoOrders = () => {
    return {
        type: CONSTANTS.CRYPTO_ORDERS.LOADING_ORDERS,
        payload: null
    };
};

export const setCryptoOrders = (payload) => {
    return {
        type: CONSTANTS.CRYPTO_ORDERS.SET_ORDER,
        payload: payload
    };
};

export const processCrypto = () => {
    return {
        type: CONSTANTS.CRYPTO_ORDERS.PROCESS_ORDER_CRYPTO,
        payload: null
    };
};

export const addCryptoOrder = (payload) => {
    return {
        type: CONSTANTS.CRYPTO_ORDERS.ADD_CRYPTO_ORDER,
        payload: payload
    };
};

export const getCryptoOrderError = (payload) => {
    return {
        type: CONSTANTS.COMMON.GET_ERRORS,
        payload: payload
    };
};

export const addCryptoOrderError = (payload) => {
    return {
        type: CONSTANTS.CRYPTO_ORDERS.ORDER_ERROR,
        payload: payload
    };
};

export const clearCryptoOrderError = () => {
    return {
        type: CONSTANTS.COMMON.CLEAR_ERROR,
        payload: null
    };
};

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.CRYPTO_ORDERS.SET_ORDER:
            return {
                cryptoOrders: action.payload,
                loadingOrders : false,
                processingOrder: false,
                error: null,
                processingError: null,
                tried: true
            };
        case CONSTANTS.CRYPTO_ORDERS.LOADING_ORDERS:
            return {
                ...state,
                loadingOrders : true,
                processingOrder: false,
                error: null,
                processingError: null,
                tried: false
            };
        case CONSTANTS.CRYPTO_ORDERS.PROCESS_ORDER_CRYPTO:
            return {
                ...state,
                loadingOrders : false,
                processingOrder: true,
                error: null,
                addedOrderStatus: false,
                processingError: null,
            };
        case CONSTANTS.CRYPTO_ORDERS.ADD_CRYPTO_ORDER:
            return {
                ...state,
                loadingOrders : false,
                processingOrder: false,
                error: null,
                processingError: null,
                addedOrderStatus: true,
                cryptoOrders: state.cryptoOrders.concat(action.payload)
            };
        case CONSTANTS.COMMON.GET_ERRORS:
            return {
                cryptoOrders: [],
                loadingOrders : true,
                processingOrder: false,
                error: action.payload,
                processingError: null,
                addedOrderStatus: false,
                tried: true,
            };
        case CONSTANTS.CRYPTO_ORDERS.ORDER_ERROR:
            return {
                ...state,
                loadingOrders : false,
                processingOrder: false,
                error: null,
                addedOrderStatus: false,
                processingError: action.payload,
                tried: false,
            };
        case CONSTANTS.COMMON.CLEAR_ERROR:
            return {
                ...state,
                loadingOrders : false,
                processingOrder: false,
                error: null,
                addedOrderStatus: false,
                processingError: null,
                tried: false,
            };
        default:
            return state;
    }
}