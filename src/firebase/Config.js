// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY6kXr1kdBrAsHgjvjuFkGLK_Qos6_7Do",
  authDomain: "authentication-92970.firebaseapp.com",
  projectId: "authentication-92970",
  storageBucket: "authentication-92970.appspot.com",
  messagingSenderId: "812450774847",
  appId: "1:812450774847:web:28ba530648c511fff65d8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);