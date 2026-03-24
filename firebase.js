import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "im-okay-with-anything-web.firebaseapp.com",
  projectId: "im-okay-with-anything-web",
  storageBucket: "im-okay-with-anything-web.appspot.com",
  messagingSenderId: "832766973420",
  appId: "1:832766973420:web:f2192587592101f0cd1cc9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
