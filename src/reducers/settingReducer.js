import CONSTANTS from "../config/constants";

const initialState = {
        kycPassed : false
};
/***************/
/***Actions****/
/*************/
export const changeKYCStatus = () => {
  return {
      type: CONSTANTS.SETTINGS.KYC_STATUS,
      payload: null
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
        [state.settings.kycPassed] : true
      };
    default:
      return state;
  }
}