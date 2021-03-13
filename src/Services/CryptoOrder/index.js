import CryptoOrderService from "./CryptoOrderService";
import {
    addCryptoOrder,
    addCryptoOrderError,
    getCryptoOrderError,
    loadingCryptoOrders,
    processCrypto,
    setCryptoOrders
} from "Redux/CryptoOrder";

const cryptoOrderService = new CryptoOrderService()

// Register UserService - return ok response on success
export const getCryptoOrders = () => dispatch => {
    dispatch(loadingCryptoOrders())
    cryptoOrderService.getCryptoOrder().then(res => {
        if(res.status === 200){
            dispatch(setCryptoOrders(res.data.data))
        }else{
            dispatch(getCryptoOrderError("There are no crypto orders"))
        }
    }).catch(err =>
        dispatch(getCryptoOrderError(err))
    );
};

// Register UserService - return ok response on success
export const buyCryptoOrder = (order) => dispatch => {
    dispatch(processCrypto())
    cryptoOrderService.placeCryptoOrder(order).then(res => {
        if(res.status === 200){
            dispatch(addCryptoOrder(order))
        }else{
            dispatch(addCryptoOrderError("There is no crypto orders"))
        }
    }).catch(err =>
        dispatch(addCryptoOrderError(err))
    );
};

// Register UserService - return ok response on success
export const updateCryptoOrderStatus = (txHash, orderId, callBack) => {
    let data = {
        orderId: orderId,
        transactionId: txHash
    }
    cryptoOrderService.processCryptoOrder(data).then((res)=>{
        if(res.status === 200){
            callBack("PROCESSING_SUCCEED", txHash)
        }else{
            callBack("PROCESSING_FAILED", txHash)
        }
    })
};