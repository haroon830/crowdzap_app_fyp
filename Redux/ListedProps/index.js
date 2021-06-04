import CONSTANTS from "Config/constants";

const initialState = {
    listedProperties : null,
    tried : false,
    loading : false,
    filterBy : null
};
/***************/
/***Actions****/
/*************/
export const loadingListedProps = (payload) => {
    return {
        type: CONSTANTS.LISTED_PROPS.LOADING_PROPS,
        payload: payload
    };
};

export const setListedProps = (payload) => {
  return {
      type: CONSTANTS.LISTED_PROPS.SET_LISTED_PROPS,
      payload: payload
  };
};

export const fetchListedPropsFailed = () => {
    return {
        type: CONSTANTS.LISTED_PROPS.FAILED_TO_GET,
        payload: null
    };
};

/***************/
/***Reducers***/
/*************/
export default function(state = initialState, action) {
  switch (action.type) {
     case CONSTANTS.LISTED_PROPS.LOADING_PROPS:
         return {
             ...state,
             loading: action.payload,
         };
     case CONSTANTS.LISTED_PROPS.SET_LISTED_PROPS:
          return {
              loading: false,
              listedProperties  : action.payload.listedProps,
              tried : true,
              filterBy: action.payload.filterBy
         };
     case CONSTANTS.LISTED_PROPS.FAILED_TO_GET:
          return {
              loading: false,
              tried : true,
          };
    default:
      return state;
  }
}