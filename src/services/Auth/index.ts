import jwt_decode from "jwt-decode";

import { getError, setCurrentUser } from "../../reducers/authReducer";
import AuthService from "./AuthService";
import LocalStore from "../../config/localStore";

const auth = new AuthService()
const localStore = new LocalStore()
// Register UserService
// @ts-ignore
export const registerUser = (userData, history) => dispatch => {
  auth.signUp(userData).then(res => history.push("/Login"))
    .catch(err =>
      dispatch(getError(err.response))
    );
};
// @ts-ignore
function setUser(data, dispatch) {
  const { token, user } = data;
  localStore.setToken(token);
  localStore.setClientId(user._id)
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
}

// @ts-ignore
// Login - get user token
export const loginUser = userData => dispatch => {
  auth.logIn(userData).then(res => {
    // Save to localStorage
    if (res.data) {
      setUser(res.data, dispatch)
    } else {
      console.log("No UserService Logged")
    }
  })
    .catch(err =>
      dispatch(getError(err.response))
    );
};

// @ts-ignore
export const loggedUser = data => dispatch => {
  setUser(data, dispatch)
}


/*
// UserService loading
export const setUserLoading = () => {
  return {
    type: CONSTANTS.AUTH.USER_LOADING
  };
};
 */

// @ts-ignore
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStore.removeToken();
  // Remove auth header for future requests
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};