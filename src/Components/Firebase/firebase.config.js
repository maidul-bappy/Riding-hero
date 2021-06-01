import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA9FdySgIL67-_7AH12QCe30GJ_pfAKccw",
  authDomain: "riding-hero-m.firebaseapp.com",
  projectId: "riding-hero-m",
  storageBucket: "riding-hero-m.appspot.com",
  messagingSenderId: "720038073083",
  appId: "1:720038073083:web:4d42f696b21d841b4a165e"
});

export default firebaseConfig;
