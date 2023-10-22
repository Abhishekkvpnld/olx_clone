import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvkFeRrBJbK77fSc2pe0c-XAFizvqcYgo",
    authDomain: "olx-clone-3c83d.firebaseapp.com",
    projectId: "olx-clone-3c83d",
    storageBucket: "olx-clone-3c83d.appspot.com",
    messagingSenderId: "849655757986",
    appId: "1:849655757986:web:065fd534b7d6d79942abfb",
    measurementId: "G-6Q9KDXJLTN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
