const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    issue_description: { type: String, required: true },
    status: { type: String, enum: ['Submitted', 'In Progress', 'Resolved'], default: 'Submitted' },
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);