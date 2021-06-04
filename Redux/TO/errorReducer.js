import CONSTANTS from "Config/constants";

const initialState = {};

export default function(state = initialState, action) {

  switch (action.type) {
    case CONSTANTS.ERROR.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}