import { CONSTANTS } from "./CONSTANTS";
import { projectLists } from "../firebase";

let initialState = [];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DATA_FROM_FIREBASE:
      return action.payload;

    default:
      return state;
  }
};

export default listReducer;
