import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDY6kXr1kdBrAsHgjvjuFkGLK_Qos6_7Do",
  authDomain: "authentication-92970.firebaseapp.com",
  projectId: "authentication-92970",
  storageBucket: "authentication-92970.appspot.com",
  messagingSenderId: "812450774847",
  appId: "1:812450774847:web:28ba530648c511fff65d8a"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);