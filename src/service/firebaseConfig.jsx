import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDelACF5wgq5pbztAfTm4TJq2qS9LjtHhg",
  authDomain: "aitrip-7bb16.firebaseapp.com",
  projectId: "aitrip-7bb16",
  storageBucket: "aitrip-7bb16.appspot.com",
  messagingSenderId: "1024317502819",
  appId: "1:1024317502819:web:9da4fba948bbbab9ba0f56",
  measurementId: "G-FGGS8756ML"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 