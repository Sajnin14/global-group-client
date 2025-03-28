// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_cAnpKWYPhzc8Hc9pvIrlVPqwU8B7RUE",
  authDomain: "global-groupware.firebaseapp.com",
  projectId: "global-groupware",
  storageBucket: "global-groupware.firebasestorage.app",
  messagingSenderId: "492380924961",
  appId: "1:492380924961:web:a26992b7e8b71667eb0760",
  measurementId: "G-7B23PMVF9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;