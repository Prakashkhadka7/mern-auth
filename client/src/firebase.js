import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fe332.firebaseapp.com",
  projectId: "mern-auth-fe332",
  storageBucket: "mern-auth-fe332.firebasestorage.app",
  messagingSenderId: "230701318204",
  appId: "1:230701318204:web:296a8040b1ce146398c339"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);