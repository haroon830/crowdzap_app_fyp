import CONSTANTS from "../config/constants";

const initialState = {
        listedProperties : null,
        tried : false,
        filterBy : null
};
/***************/
/***Actions****/
/*************/
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
    case CONSTANTS.LISTED_PROPS.SET_LISTED_PROPS:
      return {
        listedProperties  : action.payload.listedProps,
        tried : true,
        filterBy: action.payload.filterBy
    };
    case CONSTANTS.LISTED_PROPS.FAILED_TO_GET:
      return {
        tried : false,
      };
    default:
      return state;
  }
}