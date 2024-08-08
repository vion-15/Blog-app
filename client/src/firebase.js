// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1f8c6.firebaseapp.com",
  projectId: "mern-blog-1f8c6",
  storageBucket: "mern-blog-1f8c6.appspot.com",
  messagingSenderId: "518211630142",
  appId: "1:518211630142:web:49ae6453730b8baae48d6f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

