import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import process from "./process";

const firebaseConfig = {
  apiKey: process.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);

export { Storage }