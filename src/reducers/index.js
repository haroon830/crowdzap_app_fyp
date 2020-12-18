import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import settingReducer from './settingReducer'
import adminReducers from "./admin"
import listedReducers from "./listedProps"
import wallet from './wallet'


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  setting : settingReducer,
  listedProps : listedReducers,
  wallet : wallet,
  admin : adminReducers
});