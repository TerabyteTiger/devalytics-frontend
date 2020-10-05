import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

// collections
const articleCollection = db.collection("dev");
// 👆 Here you create your Collections you want to use later

// 👇 You export things here | update the variable names
export { db, articleCollection };
