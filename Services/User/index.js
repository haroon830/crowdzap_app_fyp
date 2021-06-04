import jwt_decode from "jwt-decode";

import { regProcessing, userRegistered ,regErrorOccur, errorOccur , setCurrentUser, userBeingLogged } from "Redux/User"
import {setAddresses} from 'Redux/Wallet'
import UserService from "./UserService";
import LocalStore from "Config/localStore";

const auth = new UserService()
const localStore = new LocalStore()

// Register UserService - return ok response on success
export const registerUser = (userData, history) => dispatch => {
  dispatch(regProcessing())
  auth.signUp(userData).then(res => {
    if(res.status === 200){
      dispatch(userRegistered())
    }else{
      dispatch(regErrorOccur(res.data.error))
    }
  }).catch(err =>
      dispatch(regErrorOccur(err))
    );
};

// Login - get user token & user data
export const loginUser = userData => dispatch => {
  //User Request is being processed
  dispatch(userBeingLogged())
  //Do the actual request
    auth.logIn(userData).then(res => {
      // Save to localStorage
      if (res.status === 200) {
        setUser(res.data, dispatch)
      } else {
        dispatch(errorOccur(res.data))
      }
    }).catch(err =>
        dispatch(errorOccur(err.response))
    )
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStore.removeToken();
  // Remove auth header for future requests
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}

// If Logged by using third party service
export const loggedUser = data => dispatch => {
  setUser(data, dispatch)
}


//set received data to storage and also set in store
function setUser(data, dispatch) {
  const { token, user} = data;
  localStore.setToken(token);
  localStore.setClientId(user._id)
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
  userKeys(user.keys, dispatch)
}

function userKeys(data, dispatch){
  if(data.length > 0){
    console.log(data)
    dispatch(setAddresses(data))
  }
}


export const getUserContacts = ( callBack) => {
  auth.getUserContacts().then(res => {
      if (res.status === 200 && res.data) {
          callBack("", res.data.data)
      }else{
          callBack("Failed to get contacts")
      }
  }).catch(err => {
      console.log(err)
      callBack("Failed to get contacts")
  });
};

export const addNewUserContacts = (data, callBack) => {
  auth.addUserContact(data).then(res => {
      if (res.status === 200 && res.data.status== "ok") {
          callBack("")
      }else{
          callBack("Failed to add contact")
      }
  }).catch(err => {
      console.log(err)
      callBack("Failed to add contact")
  });
};