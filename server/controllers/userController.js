const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPassword');
require('dotenv').config();

// Register User
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({"message": "Missing required fields"})
        }
        const password_hash = await hashPassword(password);
        const newUser = new User({ username, email, password_hash });
        await newUser.save();
        res.status(201).json({"message": 'User registered successfully',"user":{username,email,password}});
    } catch (err) {
        res.status(400).send("Cannot Add");

    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({"message": "Missing required fields"})
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');
        // console.log(user.id)

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).send('Invalid password');
        // Ensure JWT_SECRET is properly loaded and used here
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user)
        if (!user) return res.status(404).send('User not found');
        res.json({
                "user": {
                    "id": user._id,
                    "username": user.username,
                    "email": user.email
                }
            }
        );

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.json({
            "user": {
                "id": user._id,
                "username": username,
                "email": email,
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.status(200).json({ "message": "User deleted successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile , deleteUserProfile };