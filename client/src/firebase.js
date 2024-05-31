// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-aa983.firebaseapp.com",
  projectId: "mern-auth-aa983",
  storageBucket: "mern-auth-aa983.appspot.com",
  messagingSenderId: "319960739880",
  appId: "1:319960739880:web:ef49dbacbf94856520451d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);