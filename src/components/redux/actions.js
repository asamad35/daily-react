import { CONSTANTS } from "./CONSTANTS";
import { dailyTasksRef, dailyTasksRefQuery } from "../firebase";
import { onSnapshot } from "firebase/firestore";

export const getLiveDataFromFirebase = () => {
  return (dispatch) => {
    // get realtime arrayList from firebase
    onSnapshot(dailyTasksRefQuery, (snapshot) => {
      let listArray = snapshot.docs.map((doc) => doc.data());
      console.log(listArray);
      dispatch({
        type: CONSTANTS.GET_DATA_FROM_FIREBASE,
        payload: listArray,
      });
    });
  };
};
