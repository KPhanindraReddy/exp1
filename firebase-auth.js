import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase configuration
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

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
        console.log("reCAPTCHA solved.");
    }
});

// Send OTP function
document.getElementById("send-otp-btn").addEventListener("click", () => {
    const phoneNumber = document.getElementById("phone").value;
    if (!phoneNumber) {
        alert("Please enter a phone number.");
        return;
    }
    
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP Sent!");
        })
        .catch((error) => {
            console.error(error);
            alert("Failed to send OTP");
        });
});

// Verify OTP function
document.getElementById("verify-otp-btn").addEventListener("click", () => {
    const otp = document.getElementById("otp").value;
    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }
    
    window.confirmationResult.confirm(otp)
        .then((result) => {
            alert("OTP Verified! Authentication successful.");
        })
        .catch((error) => {
            console.error(error);
            alert("OTP verification failed");
        });
});
