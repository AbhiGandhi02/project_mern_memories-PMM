import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9U4eUyDN7s2Z_mVjyTVXyBxtwSCM4qY",
  authDomain: "mern-memories-c44bc.firebaseapp.com",
  projectId: "mern-memories-c44bc",
  storageBucket: "mern-memories-c44bc.firebasestorage.app",
  messagingSenderId: "24361913326",
  appId: "1:24361913326:web:0e5917c327d27ae3f29cff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);