const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile , deleteUserProfile } = require('../controllers/userController');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.get('/:id', getUserProfile);

// Update User Profile
router.put('/:id', updateUserProfile);

router.delete('/:id', deleteUserProfile);

module.exports = router;