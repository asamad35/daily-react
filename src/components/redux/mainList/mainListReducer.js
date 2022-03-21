import { CONSTANTS } from "../CONSTANTS";
import uniqid from "uniqid";
import { updateFirebaseDocument } from "../../firebase";

let initialState = [];

const getTargetList = (targetListId, state) => {
  return state[0].listCollection.find((list) => list.id === targetListId);
};

const newCard = () => ({
  heading: "Add card heading",
  description: "Add card description ",
  assignee: "choose 1: batman, ironman, hulk",
  priority: "high",
  deadline: "enter deadline (month date)",
  month: new Date().toLocaleString("en-us", { month: "short" }),
  date: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  id: uniqid(),
});

const newList = () => ({
  heading: "new list",
  id: uniqid(),
  cards: [newCard()],
});

const mainListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_MAIN_LIST:
      state = action.payload;
      return state;
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.ADD_CARD_LOCALLY: {
      const targetListId = action.payload.id;
      const targetList = getTargetList(targetListId, state);
      targetList.cards.push(newCard());
      console.log(state);
      updateFirebaseDocument(state);

      /*
      if we add or remove properties from an object the object refrence in memory will not change, hence the state will update but the component will not re render.
      useSelector will only re render component if the object refrence changes.
      */
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.REMOVE_CARD_LOCALLY: {
      const targetListId = action.payload.id;
      const targetList = getTargetList(targetListId, state);
      const targetCardId = action.payload.getAttribute("cardid");
      const targetCardIndex = targetList.cards.findIndex(
        (card) => card.id === targetCardId
      );
      targetList.cards.splice(targetCardIndex, 1);
      updateFirebaseDocument(state);
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.UPDATE_CARD_LOCALLY: {
      const targetListId = action.payload.e.target.id;
      const targetList = getTargetList(targetListId, state);
      const targetCardId = action.payload.e.target.getAttribute("cardid");
      const targetCard = targetList.cards.find(
        (card) => card.id === targetCardId
      );
      const targetCardIndex = targetList.cards.findIndex(
        (card) => card.id === targetCardId
      );
      targetList.cards.splice(targetCardIndex, 1);
      targetList.cards.splice(targetCardIndex, 0, {
        ...action.payload.cardDetails,
      });
      updateFirebaseDocument(state);
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.UPDATE_LIST_HEADING: {
      const targetListId = action.payload.e.target.id;
      const targetList = getTargetList(targetListId, state);
      targetList.heading = action.payload.listHeading;
      updateFirebaseDocument(state);
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.ADD_LIST_LOCALLY: {
      state[0].listCollection.push(newList());
      updateFirebaseDocument(state);
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.REMOVE_LIST_LOCALLY: {
      const listCollection = state[0].listCollection;
      const targetListId = action.payload.id;
      const targetListIndex = listCollection.findIndex(
        (list) => list.id === targetListId
      );
      listCollection.splice(targetListIndex, 1);
      updateFirebaseDocument(state);
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.HANDLE_DRAG_DROP:
      {
        const {
          listSourceId,
          listDestinationId,
          cardSourceIndex,
          cardDestinationIndex,
          cardId,
        } = action.payload;
        if (listDestinationId === listSourceId) {
          const targetList = getTargetList(listSourceId, state);
          const cards = targetList.cards;
          // remove card
          const targetCard = cards.splice(cardSourceIndex, 1);
          // add card
          cards.splice(cardDestinationIndex, 0, ...targetCard);
          updateFirebaseDocument(state);
          const newState = JSON.parse(JSON.stringify(state));
          return newState;
        }
        if (listDestinationId !== listSourceId) {
          const sourceList = getTargetList(listSourceId, state);
          const destinationList = getTargetList(listDestinationId, state);
          const sourceListCards = sourceList.cards;
          const destinationListCards = destinationList.cards;

          // remove card
          const targetCard = sourceListCards.splice(cardSourceIndex, 1);
          // add card
          destinationListCards.splice(cardDestinationIndex, 0, ...targetCard);

          updateFirebaseDocument(state);
          const newState = JSON.parse(JSON.stringify(state));
          return newState;
        }
      }
      break;

    default:
      return state;
  }
};

export default mainListReducer;