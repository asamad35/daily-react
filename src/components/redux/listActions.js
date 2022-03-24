import { CONSTANTS } from "./CONSTANTS";

export const updateListHeading = (e, listHeading) => ({
  type: CONSTANTS.UPDATE_LIST_HEADING,
  payload: { e, listHeading },
});

export const addListLocally = (e) => ({
  type: CONSTANTS.ADD_LIST_LOCALLY,
  payload: e,
});

export const removeListLocally = (e) => ({
  type: CONSTANTS.REMOVE_LIST_LOCALLY,
  payload: e.target,
});
