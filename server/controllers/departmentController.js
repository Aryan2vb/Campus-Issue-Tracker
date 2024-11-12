const Department = require('../models/Department');

// Get all departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new department
const addDepartment = async (req, res) => {
    try {
        const { department_name, contact_email } = req.body;
        const newDepartment = new Department({ department_name, contact_email });
        await newDepartment.save();
        res.status(201).json({"message": "Department created", newDepartment});
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { getDepartments, addDepartment };
