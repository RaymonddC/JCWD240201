// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1bqhxvpTi8hl8SAdCvHSsL_WIENGwGuE',
  authDomain: 'ecommercepwd.firebaseapp.com',
  projectId: 'ecommercepwd',
  storageBucket: 'ecommercepwd.firebasestorage.app',
  messagingSenderId: '305248116354',
  appId: '1:305248116354:web:ec338cae028383e04ede9b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
