import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARV_7fo7lo0EAZhyrhFFNaAElhazQJin8",
  authDomain: "edible-724b6.firebaseapp.com",
  projectId: "edible-724b6",
  storageBucket: "edible-724b6.appspot.com",
  messagingSenderId: "224290567409",
  appId: "1:224290567409:web:5c125a80782e13708ae550",
  measurementId: "G-HR4E1CR5ZF",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
