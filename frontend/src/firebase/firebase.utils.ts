import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  signInWithPopup,
  signOut,
  getAuth,
  GoogleAuthProvider,
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

// const analytics = getAnalytics(app);

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-in with Popup
const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // console.log("Google Sign-in successful:", user);
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error("Google Sign-in error:", error);
    return null;
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    // console.log("User signed out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export { auth, provider, signInWithGooglePopup, logout };
