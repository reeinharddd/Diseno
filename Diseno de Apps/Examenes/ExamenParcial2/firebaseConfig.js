/** @format */

// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcf8CehghhVO3AjjqOBVsViSGt0CoUGAU",
  authDomain: "fir-3cd5c.firebaseapp.com",
  projectId: "fir-3cd5c",
  storageBucket: "fir-3cd5c.appspot.com",
  messagingSenderId: "271748222303",
  appId: "1:271748222303:android:1511ce7e5a64d86311faea",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
