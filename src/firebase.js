// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, OAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhThOaJKSdR7lyW7czUejreOdUx32DF-c",
  authDomain: "stellr-e34cb.firebaseapp.com",
  databaseURL:
    "https://stellr-e34cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stellr-e34cb",
  storageBucket: "stellr-e34cb.appspot.com",
  messagingSenderId: "308650735070",
  appId: "1:308650735070:web:a0997a47eaffbbafc7994f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const microProvider = new OAuthProvider("microsoft.com");
const storage = getStorage(app);
microProvider.setCustomParameters({
  prompt: "consent",
});
export { db, auth, provider, microProvider, storage };
