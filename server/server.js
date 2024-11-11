const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const issueRoutes = require('./routes/issue');
const departmentRoutes = require('./routes/departments');

dotenv.config();

const app = express();
app.use(express.json());

const dbURI = process.env.MONGODB_URI
// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/issues', issueRoutes);
app.use('/api/v1/departments', departmentRoutes);

// Start the server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    return res.send('Welcome to MongoDB!');
})