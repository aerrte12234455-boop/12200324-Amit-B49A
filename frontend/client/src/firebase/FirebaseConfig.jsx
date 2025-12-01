import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMOn_JifLKqZL2yM_X62VyABl0JWaC0R4",
  authDomain: "netflix-clone-642c1.firebaseapp.com",
  projectId: "netflix-clone-642c1",
  storageBucket: "netflix-clone-642c1.firebasestorage.app",
  messagingSenderId: "532872207295",
  appId: "1:532872207295:web:b9c5ee35f08d3923295f0a",
  measurementId: "G-QHNFPFH167"
};

const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);