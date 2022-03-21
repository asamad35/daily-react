import { CONSTANTS } from "../CONSTANTS";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getMainList = () => {
  return (dispatch) => {
    const mainListsRef = collection(db, "main lists");
    getDocs(mainListsRef).then((snapshot) => {
      const allLists = snapshot.docs.map((doc) => doc.data());
      const allDocument = snapshot.docs.map((doc) => doc);
      console.log(allDocument);
      dispatch({ type: CONSTANTS.GET_MAIN_LIST, payload: allLists });
    });
  };
};
