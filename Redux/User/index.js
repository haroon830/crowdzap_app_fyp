import CONSTANTS from "Config/constants";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  processing: false,
  error: null,
  //Register comp state
  registered : null,
  regProcessing: false,
  regError: null,
};

/***************/
/***Actions****/
/*************/

//User login request is being processed
export const userBeingLogged = () => {
  return {
    type: CONSTANTS.COMMON.PROCESSING,
    payload: null
  };
};

//Set the logged user data in store
export const setCurrentUser = decoded => {
  return {
    type: CONSTANTS.AUTH.SET_CURRENT_USER,
    payload: decoded
  };
};

//Error handler, if request failed
export const errorOccur = data =>{
  return{
    type: CONSTANTS.COMMON.ERROR_OCCURS,
    payload: data
  }
}


//////REGISTER

export const regProcessing = () =>{
  return{
    type: CONSTANTS.AUTH.REG_PROCESSING,
    payload : null
  }
}
//when user register successfully
export const userRegistered = () =>{
  return{
    type: CONSTANTS.AUTH.USER_REGISTERED,
    payload : null
  }
}

//when user register successfully
export const regErrorOccur = (payload) =>{
  return{
    type: CONSTANTS.AUTH.REG_ERROR,
    payload : payload
  }
}

///COMMON FOR BOTH REG & LOGIN
//to remove error message from store
export const clearError = () =>{
  return{
    type: CONSTANTS.COMMON.CLEAR_ERROR,
    payload : null
  }
}


/***************/
/***Reducers***/
/*************/

export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.AUTH.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        processing: false,
        regProcessing: false,
        registered: false,
        error: null,
        regError: null
      };
    case CONSTANTS.COMMON.PROCESSING:
      return {
        isAuthenticated: false,
        user: null,
        processing: true,
        regProcessing: false,
        registered: false,
        error: null,
        regError: null
      };
    case CONSTANTS.COMMON.ERROR_OCCURS:
      return {
        isAuthenticated: false,
        user: null,
        regProcessing: false,
        regError: null,
        processing: false,
        error: action.payload,
        registered: false,
      }
    case CONSTANTS.AUTH.REG_PROCESSING:
      return {
        isAuthenticated: false,
        user: null,
        regProcessing: true,
        regError: null,
        processing: false,
        error: null,
        registered: false,
      }
    case CONSTANTS.AUTH.USER_REGISTERED:
      return {
        isAuthenticated: false,
        user: null,
        processing: false,
        error: null,
        regError: null,
        registered: true,
        regProcessing: false
      };
    case CONSTANTS.AUTH.REG_ERROR:
      return {
        isAuthenticated: false,
        user: null,
        processing: false,
        error: null,
        regError: action.payload,
        registered: false,
        regProcessing: false
      };
    case CONSTANTS.COMMON.CLEAR_ERROR:
      return {
        isAuthenticated: false,
        user: null,
        processing: false,
        error: null,
        regError: null,
        registered: false,
        regProcessing: false
      }
    default:
      return state;
  }
}