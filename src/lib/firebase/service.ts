import { initializeApp } from "firebase/app";

// apiKey: "AIzaSyAu3U6bDv62RzsAyu0n9c8hFNOh_tqUOOM",
// authDomain: "next-login-firebase-61819.firebaseapp.com",
// projectId: "next-login-firebase-61819",
// storageBucket: "next-login-firebase-61819.appspot.com",
// messagingSenderId: "788216176673",
// appId: "1:788216176673:web:abf8908ddbaeddb4870360"

// apiKey: process.env.FIREBASE_API_KEY,
// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// projectId: process.env.FIREBASE_PROJECT_ID,
// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.FIREBASE_APP_ID,
const firebaseConfig = {
  apiKey: "AIzaSyAu3U6bDv62RzsAyu0n9c8hFNOh_tqUOOM",
  authDomain: "next-login-firebase-61819.firebaseapp.com",
  projectId: "next-login-firebase-61819",
  storageBucket: "next-login-firebase-61819.appspot.com",
  messagingSenderId: "788216176673",
  appId: "1:788216176673:web:abf8908ddbaeddb4870360"
};

export const app = initializeApp(firebaseConfig);