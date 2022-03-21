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
export const db = getFirestore();

const mainListsRef = collection(db, "main lists");

// update firebase state
export const updateFirebaseDocument = (state) => {
  getDocs(mainListsRef).then((snapshot) => {
    const document = snapshot.docs.find(
      (doc) => doc.data().title === "daily work"
    );
    console.log(document);
    const docRef = doc(db, "main lists", document.id);
    getDoc(docRef).then((doc) => {
      updateDoc(docRef, {
        ...doc.data(),
        ...state[0],
      });
    });
  });
};
