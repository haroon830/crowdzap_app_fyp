import { getAuthToken, setUserToken } from 'Services/Api/Token';
/***********************************/
/************* Actions *************/
/***********************************/

const UserActionType  = {
  AUTHENTICATE : 'AUTHENTICATE',
  AUTHENTICATE_PENDING : 'AUTHENTICATE_PENDING',
  AUTHENTICATE_FULFILLED : 'AUTHENTICATE_FULFILLED',
  AUTHENTICATE_REJECTED : 'AUTHENTICATE_REJECTED',
}

export function authenticate() {
  return {
    type: UserActionType.AUTHENTICATE,
    payload: getAuthToken()
  };
}

/***********************************/
/************* Reducer *************/
/***********************************/


export const initUserState = {
  isLogin: false,
  isAuth: true
};

const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case UserActionType.AUTHENTICATE_PENDING: {
      return { ...state, isAuth: false };
    }
    case UserActionType.AUTHENTICATE_FULFILLED: {
      return { ...state, isLogin: true, isAuth: true };
    }
    case UserActionType.AUTHENTICATE_REJECTED: {
      setUserToken(null);
      return { ...state, isLogin: false, isAuth: true};
    }
    default: return state;
  }
};

export default userReducer;