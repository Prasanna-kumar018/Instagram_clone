// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy3iuBEYck9nJwAPg597_0vUa_mhqa6Ug",
  authDomain: "insta-clone-45205.firebaseapp.com",
  projectId: "insta-clone-45205",
  storageBucket: "insta-clone-45205.appspot.com",
  messagingSenderId: "856907901238",
  appId: "1:856907901238:web:4af080cebcc1188d562b97",
  measurementId: "G-BCFYGXYFVV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
