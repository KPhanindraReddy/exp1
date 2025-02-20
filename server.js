const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage (use a database in production)
const users = {}; // { email: { name, password, otp } }

// Configure the email transporter (Use your own email credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phanindrakamana50101@gmail.com', // Replace with your email
    pass: '80101@Mohans' // Replace with your email password (Use environment variables in production)
  }
});

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

    // Save user with OTP temporarily in memory
    users[email] = { name, password, otp };

    // Send OTP to email using Nodemailer
    const mailOptions = {
        from: 'phanindrakamana50101@gmail.com',
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
        res.json({ message: 'OTP sent to your email. Please verify it.' });
    });
});

// Verify OTP Route
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (users[email] && users[email].otp === parseInt(otp)) {
        res.json({ message: 'OTP verified successfully.' });
    } else {
        res.json({ message: 'Invalid OTP. Please try again.' });
    }
});

// Login Route
app.post('/login', (req, res) => {
    const { email } = req.body;

    if (users[email]) {
        res.json({ message: `OTP sent to ${email}. Check your email to log in.` });
    } else {
        res.json({ message: 'User not found. Please register first.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
