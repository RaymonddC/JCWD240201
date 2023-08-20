// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADvhN_O4ZaMStI122fFaN0KGcpFnAwy28",
  authDomain: "jcwd2024.firebaseapp.com",
  projectId: "jcwd2024",
  storageBucket: "jcwd2024.appspot.com",
  messagingSenderId: "795409810908",
  appId: "1:795409810908:web:86dcca8e25f8cc483dfb19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);