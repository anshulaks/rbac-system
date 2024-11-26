const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/admin', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/user', verifyToken, (req, res) => {
  res.json({ message: 'Welcome User!' });
});

router.get('/moderator', verifyToken, verifyRole(['moderator']), (req, res) => {
  res.json({ message: 'Welcome Moderator!' });
});

// This is for shared resource with different permissions based on user roles
router.get('/resource', verifyToken, (req, res) => {
  const role = req.user.role;

  if (role === 'admin') {
    res.json({
      message: 'Admin: You are allowed to view, edit, and delete this resource.',
      permissions: ['view', 'edit', 'delete']
    });
  } else if (role === 'moderator') {
    res.json({
      message: 'Moderator: You are allowed to view and edit this resource.',
      permissions: ['view', 'edit']
    });
  } else if (role === 'user') {
    res.json({
      message: 'User: You are allowed to only view this resource.',
      permissions: ['view']
    });
  } else {
    res.status(403).json({ error: 'Access denied.' });
  }
});

// Route to edit the resource (Only admin and moderators are allowed to edit)
router.put('/resource', verifyToken, (req, res) => {
  const role = req.user.role;

  if (role === 'admin' || role === 'moderator') {
    res.json({ message: `${role}: You edited the resource.` });
  } else {
    res.status(403).json({ error: 'Access denied. Only admins and moderators can edit the resource.' });
  }
});

// Route to delete the resource (Admin only is allowed to delete)
router.delete('/resource', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Admin: You deleted the resource.' });
});

module.exports = router;
