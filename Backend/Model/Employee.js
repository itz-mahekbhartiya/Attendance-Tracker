const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = mongoose.Schema({
    FullName: { type: String, required: true },
    EmpId: { type: String, required: true, unique: true },
    Gender: { type: String, required: true },
    Address: { type: String, required: true },
    Password: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

// Attendance Schema
const attendanceSchema = mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true, default: Date.now },
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },
    status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = { Employee, Attendance };
