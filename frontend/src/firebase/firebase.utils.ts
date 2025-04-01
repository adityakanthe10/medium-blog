/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import {
  signInWithRedirect,
  getRedirectResult,
  signOut,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9n5AIy674EZKh7aLHZom5EWDoICPZae0",
  authDomain: "bloggle-5349f.firebaseapp.com",
  projectId: "bloggle-5349f",
  storageBucket: "bloggle-5349f.firebasestorage.app",
  messagingSenderId: "117153245682",
  appId: "1:117153245682:web:b1962f7b030ebde0aa236b",
  measurementId: "G-Q9B58GFPG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithRedirect, getRedirectResult, signOut };
