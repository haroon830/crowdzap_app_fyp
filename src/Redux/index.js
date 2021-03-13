import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from "./User";
import errorReducer from "./TO/errorReducer";
import settingReducer from "./Setting";
import listedReducers from "./ListedProps";
import wallet from "./Wallet";
import cryptoOrders from "./CryptoOrder";
import cryptoTransfer from './CryptoTransfer'
import authorityContract from './AuthorithyContract'

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    setting : settingReducer,
    listedProps : listedReducers,
    wallet : wallet,
    cryptoOrders: cryptoOrders,
    cryptoTransfer: cryptoTransfer,
    authorityContract: authorityContract,
});
const initialState = {}

const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
);

export default store;