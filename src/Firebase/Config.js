import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD496wamNYZ74oklYwt3kHqVXl4y2i8wh4",
    authDomain: "olx-clone-8a347.firebaseapp.com",
    projectId: "olx-clone-8a347",
    storageBucket: "olx-clone-8a347.appspot.com",
    messagingSenderId: "984793596613",
    appId: "1:984793596613:web:2e53fcc09ad9741ad966ac",
    measurementId: "G-FDS3SLVNQV"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
