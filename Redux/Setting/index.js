import CONSTANTS from "Config/constants";

const initialState = {
    kycPassed : false,
    lang : 'en'
};
/***************/
/***Actions****/
/*************/
export const changeKYCStatus = () => {
  return {
      type: CONSTANTS.SETTING.KYC_STATUS,
      payload: null
  };
};

export const changeLanguage = (payload) => {
    return {
        type: CONSTANTS.SETTING.KYC_STATUS,
        payload: payload
    };
};

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SETTING.KYC_STATUS:
      return {
        ...state,
        kycPassed : true
      };
    case CONSTANTS.SETTING.CHANGE_LANGUAGE:
       return {
           ...state,
           lang : action.payload
       };
    default:
      return state;
  }
}