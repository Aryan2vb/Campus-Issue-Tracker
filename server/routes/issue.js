const express = require('express');
const router = express.Router();
const { submitIssue, getIssueDetails, filterIssuesByStatus } = require('../controllers/issueController');
const authenticateToken = require('../middleware/auth');

// Submit a new issue
router.post('/', authenticateToken, submitIssue);

// Get issue details
router.get('/:id', authenticateToken, getIssueDetails);

// Filter issues by status
router.get('/', authenticateToken, filterIssuesByStatus);

module.exports = router;