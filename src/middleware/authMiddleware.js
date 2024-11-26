const jwt = require('jsonwebtoken');
 // Adjust path if needed
 const  blacklist = require('../utils/tokenBlacklist.js'); // Adjust path if needed


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
  if (!token) {
    return res.status(403).json({ error: 'Malformed token' });
  }

    // Check if the token is in the blacklist
  if (blacklist.has(token)) {
      return res.status(401).json({ error: 'Token is blacklisted. Please log in again.' });
    }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach decoded user data to the request
    next(); // Move to the next middleware or route
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' }); // Token is invalid
  }
};

// Middleware to verify the user's role and restrict access based on allowed roles
exports.verifyRole = (roles) => (req, res, next) => {
  // Check if the user's role is included in the allowed roles
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied' });
  }// If the user's role is authorized, proceed to the next middleware or route handler
  next();
};
