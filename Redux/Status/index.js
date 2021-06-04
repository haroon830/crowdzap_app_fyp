import { SupportedLanguage } from 'Services/Geo';
/***********************************/
/************* Actions *************/
/***********************************/

const  StatusActionType =  {
  LANGUAGE_CHANGE : 'LANGUAGE_CHANGE'
}

export function changeLanguage(lang) {
  return {
    type: StatusActionType.LANGUAGE_CHANGE,
    payload: lang
  };
}

/***********************************/
/************* Reducer *************/
/***********************************/


export const initStatusState = {
  lang: SupportedLanguage.en
};

const statusReducer = (state = initStatusState, action) => {
  switch (action.type) {
    case StatusActionType.LANGUAGE_CHANGE: {
      return { ...state, lang: action.payload };
    }
    default: return state;
  }
};

export default statusReducer;