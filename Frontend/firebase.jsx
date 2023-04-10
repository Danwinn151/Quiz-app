// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Waw9-kHLD9362MAhyFn8UZ4ap5ELKLg",
  authDomain: "quiz-app-b7063.firebaseapp.com",
  projectId: "quiz-app-b7063",
  storageBucket: "quiz-app-b7063.appspot.com",
  messagingSenderId: "928065263933",
  appId: "1:928065263933:web:6cb24f615fa2d10508cd54",
  measurementId: "G-CERZGVNK6L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
