// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "mern-auth-f97ff.firebaseapp.com",
  projectId: "mern-auth-f97ff",
  storageBucket: "mern-auth-f97ff.appspot.com",
  messagingSenderId: "944215912767",
  appId: "1:944215912767:web:dbbfd2dead20c29b50638a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);