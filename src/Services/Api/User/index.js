// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { apiServer } from "../Config";

export const userAxios = axios.create({
  baseURL: apiServer + '/api/user/',
});
const errorHandler = (err) => {
  if (err.response && err.response.data) {
    // tslint:disable-next-line:no-console
    console.log(err.response.data);
    return err.response.data;
  }
  return null;
};

/***********************************/
/************* Register ************/
/***********************************/


export async function register(data) {
  try {
    const registerResponse = await userAxios.post('register', data);
    if (registerResponse && registerResponse.data) {
      return registerResponse.data;
    }
  } catch (err) {
    errorHandler(err);
  }
  return null;
}

/***********************************/
/************* Login ***************/
/***********************************/


export async function login(data) {
  try {
    const loginResponse = await userAxios.put('login', data);
    if (loginResponse && loginResponse.data) {
      return loginResponse.data;
    }
  } catch (err) {
    errorHandler(err);
  }
  return null;
}

/***********************************/
/************* Active **************/
/***********************************/

export async function active(data) {
  try {
    const activeResponse = await userAxios.put('active-account', data);
    if (activeResponse && activeResponse.data) {
      return activeResponse.data;
    }
  } catch (err) {
    errorHandler(err);
  }
  return null;
}
