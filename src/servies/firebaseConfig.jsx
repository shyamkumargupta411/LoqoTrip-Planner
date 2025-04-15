// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ5m5YBgDw4nMGgHYQRLb734Dj9ntLwmk",
  authDomain: "trip-3834c.firebaseapp.com",
  projectId: "trip-3834c",
  storageBucket: "trip-3834c.firebasestorage.app",
  messagingSenderId: "24321682188",
  appId: "1:24321682188:web:f28eb3914b682e3fc87729",
  measurementId: "G-68GLWE9QLC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);