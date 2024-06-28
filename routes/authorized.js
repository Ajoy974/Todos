const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/Users"); // Ensure the correct path to your User model

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Setup express application
const app = express();

// Middleware to parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Initialize express Router
const router = express.Router();

// User registration route
router.post("/userData", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const createdUser = await User.create({
            username,
            email,
            password: hashPass
        });

        // Redirect to signin page
        res.redirect('/signin');
    } catch (error) {
        // Log the error and send a 500 response
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// User login route
router.post("/verifyUser", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Set token in cookie (for server-side and client-side usage)
        res.cookie('data', token, { httpOnly: true }); // Adding httpOnly for security

        // Redirect to home page or any other desired route
        res.redirect('/');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});


// Protected route example

// Mount the router on the app

module.exports = router;
