// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPn2snZMTwwZgw3B7kCOEQ8-qjAyZEKWw",
  authDomain: "kube-retail-tech-app.firebaseapp.com",
  projectId: "kube-retail-tech-app",
  storageBucket: "kube-retail-tech-app.appspot.com",
  messagingSenderId: "54716368334",
  appId: "1:54716368334:web:907bc2ba1df515ef65d79f",
  measurementId: "G-88JCNH5BTB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)