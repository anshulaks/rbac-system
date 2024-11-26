const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { logout } = require('../controllers/authController');

// Route for user registration
// Accepts user details (name, email, password, role) and creates a new user in the database
router.post('/register', register);

// Route for user login
// Validates user credentials and returns a JWT token for authentication
router.post('/login', login);

// Route for user logout
// Invalidates the user's token by adding it to the blacklist
router.post('/logout', logout);

module.exports = router; // Export the router for use in the main server




