// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3gZQ1DXVo7dXwqF3CYEfuMXSsucQHL68",
  authDomain: "fintrack-d6437.firebaseapp.com",
  projectId: "fintrack-d6437",
  storageBucket: "fintrack-d6437.appspot.com",
  messagingSenderId: "897178953584",
  appId: "1:897178953584:web:2f33ba206ce7e4894051b5",
  measurementId: "G-B1S6GR3XLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export{db,auth,provider,doc,setDoc};

