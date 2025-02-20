import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyC6i3eOhOO_xtplkKVBc9tPNWq3nYkH0",
  authDomain: "bmi-39287.firebaseapp.com",
  projectId: "bmi-39287",
  storageBucket: "bmi-39287.firebasestorage.app",
  messagingSenderId: "275827587990",
  appId: "1:275827587990:web:2fd3806642b7fb0c82bbb7",
  measurementId: "G-EKGRML8Y60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export for usage in other files
export { app, auth, RecaptchaVerifier };
