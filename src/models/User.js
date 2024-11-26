const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // User's hashed password (required for authentication)
  role: { type: String, default: 'user' } // User's role (default is 'user', can be 'admin' or 'moderator')
});

// Export the User model to interact with the 'users' collection in the database
module.exports = mongoose.model('User', userSchema);
