const Issue = require('../models/Issue');
const Department = require('../models/Department');
const User = require('../models/User');

// Submit a new issue
const submitIssue = async (req, res) => {
    try {
        const { department_id, issue_description } = req.body;
        const user_id = req.user.id;  // Get user ID from JWT

        const issue = new Issue({ user_id, department_id, issue_description });
        await issue.save();
        res.status(201).send('Issue submitted successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Get issue details
const getIssueDetails = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id)
            .populate('user_id')
            .populate('department_id');
        if (!issue) return res.status(404).send('Issue not found');
        res.json(issue);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Filter issues by status
const filterIssuesByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const issues = await Issue.find(status ? { status } : {});
        res.json(issues);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { submitIssue, getIssueDetails, filterIssuesByStatus };