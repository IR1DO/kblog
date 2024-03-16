// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'kblog-dc222.firebaseapp.com',
  projectId: 'kblog-dc222',
  storageBucket: 'kblog-dc222.appspot.com',
  messagingSenderId: '358944241716',
  appId: '1:358944241716:web:103a4858951f1d7f53f261',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
