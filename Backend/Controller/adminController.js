const cron = require('node-cron');
const mongoose = require('mongoose');
const { Employee, Attendance } = require('../Model/Employee'); 

async function getEmployees(req, res) {
    try {
        const employees = await Employee.find({}, 'EmpId FullName Gender');
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch employees' });
    }
};



const getEmployeeById = async (req, res) => {
    const empId = req.params.id; // Retrieve empId from the request parameters
    console.log(empId);
    console.log(typeof empId);
    try {
        // Ensure empId is cast to string
        const employee = await Employee.find({ EmpId: empId });
        console.log('employee :',employee);

        if (!employee) {
            console.log("Employee found empty");
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        console.log("Employee id:", employee[0]._id);
        const attendance = await Attendance.find({ 
            employee: employee[0]._id });
        console.log('Attendance :',attendance);

        return res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch attendance history' });
    }
};




 module.exports = {getEmployees, getEmployeeById};