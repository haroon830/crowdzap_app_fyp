import { combineReducers } from "redux";
import cryptoOrderReducer from "./cryptoOrders";
import nodeConfig from './node'

export default combineReducers({
  cryptoOrders: cryptoOrderReducer,
  nodeConfig: nodeConfig
});