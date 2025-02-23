import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAR3AIZ0Sz1A0O6m19_JlmE6-EvbI1uFLE",
    authDomain: "minihackaton45.firebaseapp.com",
    projectId: "minihackaton45",
    storageBucket: "minihackaton45.firebasestorage.app",
    messagingSenderId: "175545957285",
    appId: "1:175545957285:web:685c3eef0c7bf241e9c64c"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
export {db,auth} 
