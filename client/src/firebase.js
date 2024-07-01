// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-19856.firebaseapp.com",
  projectId: "mern-auth-19856",
  storageBucket: "mern-auth-19856.appspot.com",
  messagingSenderId: "7169271318",
  appId: "1:7169271318:web:f2c23dfc50748afed47737"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);