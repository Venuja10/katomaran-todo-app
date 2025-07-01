import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBnh15rdi6q-T8LdJbXgXHiSrmN-cLCH8",
  authDomain: "todoapp-decf5.firebaseapp.com",
  projectId: "todoapp-decf5",
  storageBucket: "todoapp-decf5.firebasestorage.app",
  messagingSenderId: "837252087533",
  appId: "1:837252087533:web:98c377ca454887002ad6e4"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
