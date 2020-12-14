import CONSTANTS from "../config/constants";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

/***************/
/***Actions****/
/*************/

// Set logged in user
// @ts-ignore
export const setCurrentUser = decoded => {
  return {
    type: CONSTANTS.AUTH.SET_CURRENT_USER,
    payload: decoded
  };
};

// @ts-ignore
export const getError = data =>{
  return{
    type: CONSTANTS.ERROR.GET_ERRORS,
    payload: data
  }
}


/***************/
/***Reducers***/
/*************/

export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.AUTH.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CONSTANTS.AUTH.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}