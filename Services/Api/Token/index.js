import axios from 'axios';
import { apiServer } from '../Config';

const storage= localStorage || window.localStorage;
var userToken= null;

export function getUserToken() {
  if (userToken) {
    return userToken;
  } else if (storage) {
    userToken = storage.getItem('user_token');
    return userToken;
  } else { return null; }
}

export function setUserToken(token) {
  if (storage) {
    if (token) {
      storage.setItem('user_token', token);
    } else { storage.removeItem('user_token'); }
    userToken = token;
  }
}

export function getAuthToken() {
  return axios.get(apiServer + '/api/user', { headers: { token: userToken } });
}