import { auth, RecaptchaVerifier } from "./firebase-config.js";
import { signInWithPhoneNumber } from "firebase/auth";

// Function to initialize Recaptcha
function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "normal",
            callback: (response) => {
                console.log("reCAPTCHA solved!", response);
            },
            "expired-callback": () => {
                alert("reCAPTCHA expired. Please refresh the page.");
            }
        });

        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    }
}

// Call setupRecaptcha on page load
window.onload = setupRecaptcha;

// Function to send OTP
window.sendOTP = function () {
    let phoneNumber = document.getElementById("phone").value.trim();
    
    if (!phoneNumber) {
        alert("Please enter a valid phone number.");
        return;
    }

    setupRecaptcha();  // Ensure Recaptcha is initialized

    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById("otp-section").style.display = "block";
            alert("OTP sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending OTP:", error);
            alert(error.message);
        });
};

// Function to verify OTP
window.verifyOTP = function () {
    let otpCode = document.getElementById("otp").value.trim();

    if (!otpCode) {
        alert("Please enter the OTP.");
        return;
    }

    window.confirmationResult.confirm(otpCode)
        .then((result) => {
            alert("Phone number verified successfully!");
        })
        .catch((error) => {
            console.error("Error verifying OTP:", error);
            alert("Invalid OTP. Try again.");
        });
};
