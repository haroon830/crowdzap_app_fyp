import { setCryptoOrders, fetchOrderFailed } from "../../../reducers/admin/cryptoOrders";
import {getError} from '../../../reducers/authReducer'
import CryptoOrderService from "./CryptoOrdersService";

const cryptoOrderService = new CryptoOrderService()

// Login - get user token
export const getCryptoOrders = (nodeName:string) => (dispatch: any) => {
    cryptoOrderService.getCryptoOrders({nodeName: nodeName}).then(res => {
        if (res.status === 200) {
        dispatch(setCryptoOrders(res.data.data))
        } else {
          console.log(res)
          dispatch(getError(res.data.data))
          dispatch(fetchOrderFailed())
        }
  })
    .catch(err =>{
      dispatch(getError(err.response))
      dispatch(fetchOrderFailed())
    });
};
