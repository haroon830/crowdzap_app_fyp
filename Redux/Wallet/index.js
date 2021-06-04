import CONSTANTS from "Config/constants";

const initialState = {
    addresses : [],
    loading : false,
    walletLocked : true,
    processAddingKey : false,
    tried : false,
    error : null,
    walletObj: null,
    walletError : null,
    ///////////////////////
    //chain operations state
    ///////////////////////
    triedAccountData : null,
    accountsData : {
        balance : 0,
        data : []
    },
    loadAccountData : false,
    accountDataError : null
};

const ACTIONS = {
    CLEAR_WALLET_ERROR : "[wallet] CLEAR_WALLET_ERROR"
}
/***************/
/***Actions****/
/*************/
export const loadingAddresses = () => {
    return {
        type: CONSTANTS.WALLET.LOADING_ADDRESSES,
        payload: null
    };
};

export const setAddresses = (payload) => {
  return {
      type: CONSTANTS.WALLET.SET_KEYS,
      payload: payload
  };
};

export const addNewAddress = (payload) => {
    return {
        type: CONSTANTS.WALLET.ADD_NEW_KEY,
        payload: payload
    };
};

export const processAddNewAddress = () => {
    return {
        type: CONSTANTS.WALLET.PROCESS_ADD_NEW_KEY,
        payload: null
    };
};

export const changeLockStatus = () => {
    return {
        type: CONSTANTS.WALLET.WALLET_LOCKED,
        payload: null
    };
};

export const setWallet = (payload)=>{
    return{
        type: CONSTANTS.WALLET.SET_WALLET,
        payload: payload
    }
}

export const errorOccur = (error) => {
    return {
        type: CONSTANTS.COMMON.ERROR_OCCURS,
        payload: error
    };
};

export const walletErrorOccur = (error) => {
    return {
        type: CONSTANTS.WALLET.WALLET_ERROR,
        payload: error
    };
};

//////////////////
//Chain Operations
/////////////////
export const loadingAccountsData = ()=>{
    return{
        type: CONSTANTS.WALLET.LOADING_ACCOUNTS_DATA,
        payload: null
    }
}

export const setAccountsData = (payload)=>{
    return{
        type: CONSTANTS.WALLET.SET_ACCOUNTS_DATA,
        payload: payload
    }
}

export const accountsDataError = (payload)=>{
    return{
        type: CONSTANTS.WALLET.ACCOUNTS_DATA_ERROR,
        payload: payload
    }
}

export const clearError = () => {
    return {
        type: ACTIONS.CLEAR_WALLET_ERROR,
        payload: null
    };
};

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.WALLET.SET_KEYS:
      return {
          ...state,
          addresses  : action.payload,
          tried : true,
    };
    case CONSTANTS.WALLET.SET_WALLET:
      return {
          ...state,
          loading: false,
          walletError: null,
          walletObj: action.payload
      };
    case CONSTANTS.WALLET.WALLET_ERROR:
      return {
          ...state,
          loading: false,
          walletError: action.payload,
          tried: true
      };
    case CONSTANTS.WALLET.LOADING_ADDRESSES:
      return {
          ...state,
          tried : false,
          loading: true,
      };
    case CONSTANTS.WALLET.WALLET_LOCKED:
          return {
              ...state,
              walletLocked: !state.walletLocked
          }
    case CONSTANTS.WALLET.PROCESS_ADD_NEW_KEY:
          return {
              ...state,
              processAddingKey: true
          };
    case CONSTANTS.WALLET.ADD_NEW_KEY:
        return {
            ...state,
            processAddingKey: false,
            addresses : state.addresses.concat(action.payload.addresses),
            error: null
        };
    case CONSTANTS.COMMON.ERROR_OCCURS:
      return {
          ...state,
          loading: false,
          error: action.payload,
          tried: true
      };
      ///////////////////
      //chain Operations
      //////////////////
    case CONSTANTS.WALLET.LOADING_ACCOUNTS_DATA:
      return {
          ...state,
          loadAccountData: true,
      };
    case CONSTANTS.WALLET.SET_ACCOUNTS_DATA:
      return {
          ...state,
          loadAccountData: false,
          triedAccountData: true,
          accountsData: action.payload
      };
    case CONSTANTS.WALLET.ACCOUNTS_DATA_ERROR:
      return {
          ...state,
          loadAccountData: false,
          triedAccountData: true,
          accountDataError: action.payload
      };

    case ACTIONS.CLEAR_WALLET_ERROR :
      return {
          ...state,
          error: null,
          walletError: null,
          accountDataError: null
      }
    default:
      return state;
  }
}