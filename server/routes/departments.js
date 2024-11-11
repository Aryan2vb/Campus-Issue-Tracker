const express = require('express');
const router = express.Router();
const { getDepartments, addDepartment } = require('../controllers/departmentController');
const authenticateToken = require('../middleware/auth');

// Get all departments
router.get('/', authenticateToken, getDepartments);

// Add a new department
router.post('/', authenticateToken, addDepartment);

module.exports = router;