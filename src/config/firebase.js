// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFW4bE36kPX6Zosk4fT9smI-4FSbr_rXg",
  authDomain: "todo-list-ff966.firebaseapp.com",
  projectId: "todo-list-ff966",
  storageBucket: "todo-list-ff966.appspot.com",
  messagingSenderId: "825882733767",
  appId: "1:825882733767:web:242b1c734d39e65c2ea2e2",
  measurementId: "G-PYWKD5D66S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then(result => {
    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePic", profilePic);
  }).catch(err => {
    console.log(err);
  })
}

const db = getFirestore(app);

export {auth, db, signInWithGoogle}