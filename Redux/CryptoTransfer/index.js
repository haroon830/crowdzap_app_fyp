import CONSTANTS from "Config/constants";

const initialState = {
    processing : false,
    processingError : null,
    processedTransaction : null
}

/***************/
/***Actions****/
/*************/

export const processingCryptoOrder = () => {
    return{
        type : CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER,
        payload : null
    }
}

export const cryptoOrderProcessed = (payload) => {
    return{
        type : CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER_SUCCEED,
        payload : payload
    }
}

export const cryptoOrderError = (error) => {
    return{
        type : CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER_ERROR,
        payload : error
    }
}

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER:
            return {
                processing: true,
                processingError: null,
                processedTransaction: null
            }
        case CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER_SUCCEED:
            return {
                processing: false,
                processingError: null,
                processedTransaction: action.payload
            }
        case CONSTANTS.CRYPTO_TRANSFER.PROCESSING_ORDER_ERROR:
            return {
                processing: false,
                processingError: action.payload,
                processedTransaction: null
            }
        default:
            return state
    }
}