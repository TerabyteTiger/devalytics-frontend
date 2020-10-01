import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDYcZYAvr1yLfRK36mRhg4Jk7HS1d6Tey0",
  authDomain: "dev-to-daily-stats.firebaseapp.com",
  databaseURL: "https://dev-to-daily-stats.firebaseio.com",
  projectId: "dev-to-daily-stats",
  storageBucket: "dev-to-daily-stats.appspot.com",
  messagingSenderId: "779642916900",
  appId: "1:779642916900:web:fcbec8ade24215f582c8b1"
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

// collections
const articleCollection = db.collection("dev");
// 👆 Here you create your Collections you want to use later

// 👇 You export things here | update the variable names
export { db, articleCollection };
