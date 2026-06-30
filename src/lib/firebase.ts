import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsGrEwCrRWL15dddJlT2-JQWGXLLqiDuM",
  authDomain: "threat-lens-ce0a3.firebaseapp.com",
  projectId: "threat-lens-ce0a3",
  storageBucket: "threat-lens-ce0a3.firebasestorage.app",
  messagingSenderId: "665338700260",
  appId: "1:665338700260:web:8f7a3a79575342a268e7f1",
  measurementId: "G-YJ6FCE7K9Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
