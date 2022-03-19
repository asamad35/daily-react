// Import the functions you need from the SDKs you need
import uniqid from "uniqid";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDMqSMZNmOZGn0KjtzErQ1pvilbXdNPMc",
  authDomain: "kanban-app-fe757.firebaseapp.com",
  projectId: "kanban-app-fe757",
  storageBucket: "kanban-app-fe757.appspot.com",
  messagingSenderId: "911253918500",
  appId: "1:911253918500:web:db57c0772e0e99f46599b1",
  measurementId: "G-S07Z6Z167Q",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// get database
const db = getFirestore();

// get collection
export const dailyTasksRef = collection(db, "daily tasks");
export const dailyTasksRefQuery = query(dailyTasksRef, orderBy("createdAt"));

// adding list
export const addList = () =>
  addDoc(dailyTasksRef, {
    heading: "List Heading",
    id: uniqid(),
    createdAt: serverTimestamp(),
    cards: [
      {
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
      },
    ],
  });

// get targetList by getDocs method
const getTargetList = (snapshot, e) =>
  snapshot.docs.find((doc) => doc.data().id === e.target.id);

// remove list
export const removeList = (e) => {
  getDocs(dailyTasksRef).then((snapshot) => {
    const targetList = getTargetList(snapshot, e);
    const listRef = doc(db, "daily tasks", targetList.id);
    deleteDoc(listRef);
  });
};

// get a single document
const docRef = doc(db, "daily tasks", "VPGPGHkUBBYtQDtIi4bP");
// getDoc(docRef).then((doc) => console.log(doc.data(), doc.id));

// add card to list
export const addCard = (e) => {
  getDocs(dailyTasksRef).then((snapshot) => {
    const targetList = getTargetList(snapshot, e);
    const listRef = doc(db, "daily tasks", targetList.id);
    getDoc(listRef).then((doc) => {
      updateDoc(listRef, {
        ...doc.data(),
        cards: [
          ...doc.data().cards,
          {
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
          },
        ],
      });
    });
  });
};

// remove card
export const removeCard = (e) => {
  getDocs(dailyTasksRef).then((snapshot) => {
    const targetList = getTargetList(snapshot, e);
    const listRef = doc(db, "daily tasks", targetList.id);
    const targetCardId = e.target.getAttribute("cardid");
    getDoc(listRef).then((doc) => {
      const cardIndex = doc.data().cards.findIndex((card) => {
        return card.id === targetCardId;
      });
      const cardsArray = doc.data().cards;
      cardsArray.splice(cardIndex, 1);

      updateDoc(listRef, {
        ...doc.data(),
        cards: [...cardsArray],
      });
    });
  });
};

// update card
export const updateCard = (e, cardDetails) => {
  getDocs(dailyTasksRef).then((snapshot) => {
    const targetList = getTargetList(snapshot, e);
    const listRef = doc(db, "daily tasks", targetList.id);
    getDoc(listRef).then((doc) => {
      const targetCardId = e.target.getAttribute("cardid");
      const targetCardIndex = doc.data().cards.findIndex((card) => {
        return card.id === targetCardId;
      });
      // remove card
      const cardsArray = doc.data().cards;
      cardsArray.splice(targetCardIndex, 1);

      // insertCard
      cardsArray.splice(targetCardIndex, 0, { ...cardDetails });

      updateDoc(listRef, {
        ...doc.data(),
        cards: [...cardsArray],
      });
    });
  });
};

// update list heading
export const updateListHeading = (e, updatedHeading) => {
  getDocs(dailyTasksRef).then((snapshot) => {
    const targetList = getTargetList(snapshot, e);
    const listRef = doc(db, "daily tasks", targetList.id);
    getDoc(listRef).then((doc) => {
      updateDoc(listRef, {
        ...doc.data(),
        heading: updatedHeading,
      });
    });
  });
};

// persist card order
export const persistCardOrder = (
  listSourceId,
  listDestinationId,
  cardSourceIndex,
  cardDestinationIndex,
  cardId
) => {
  if (listSourceId === listDestinationId) {
    getDocs(dailyTasksRef).then((snapshot) => {
      const targetList = snapshot.docs.find(
        (doc) => doc.data().id === listSourceId
      );
      const listRef = doc(db, "daily tasks", targetList.id);
      const cards = targetList.data().cards;
      const targetCard = cards[cardSourceIndex];
      cards.splice(cardSourceIndex, 1);
      cards.splice(cardDestinationIndex, 0, targetCard);
      getDoc(listRef).then((doc) => {
        updateDoc(listRef, {
          ...doc.data(),
          cards: [...cards],
        });
      });
    });
  }
};
