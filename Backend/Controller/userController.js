const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const { Employee, Attendance } = require('../Model/Employee');

async function checkIn(req, res) {
    try {
        console.log("CheckIn Cookies:", req.cookies);
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const empId = decoded.id;

        console.log("CheckIn EmpId (from token):", empId);
        console.log("CheckIn Cookies:", req.cookies);

        const employee = await Employee.findById(empId);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({ employee: employee._id, date: today });
        if (attendance) {
            return res.status(400).json({ success: false, message: 'Already checked in for today' });
        }

        attendance = new Attendance({
            employee: employee._id,
            date: today,
            checkInTime: new Date(),
            status: 'Present'
        });

        await attendance.save();

        return res.status(200).json({ success: true, message: 'Check-in successful', attendance, date: new Date() });
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ success: false, message: 'Check-in failed', error: error.message });
    }
}

async function checkOut(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const empId = decoded.id;

        const employee = await Employee.findById(empId);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({ employee: employee._id, date: today });
        if (!attendance || !attendance.checkInTime) {
            return res.status(400).json({ success: false, message: 'No check-in record found for today' });
        }

        if (attendance.checkOutTime) {
            return res.status(400).json({ success: false, message: 'Already checked out for today' });
        }

        attendance.checkOutTime = new Date();
        await attendance.save();

        return res.status(200).json({ success: true, message: 'Check-out successful', date: attendance.checkOutTime });
    } catch (error) {
        console.error('Check-out error:', error);
        res.status(500).json({ success: false, message: 'Check-out failed', error: error.message });
    }
}

cron.schedule('9 10 * * *', async () => {
    try {
        console.log("Automatic absentee marking triggered.");

        const dateUTC = new Date();
        const todayIST = new Date(dateUTC.getTime() + (5 * 60 + 30) * 60 * 1000);
        todayIST.setHours(0, 0, 0, 0);
        const midnightUTC = new Date(todayIST.getTime() - (5 * 60 + 30) * 60 * 1000);

        const allEmployees = await Employee.find();

        for (const employee of allEmployees) {
            const attendanceRecord = await Attendance.findOne({
                employee: employee._id,
                date: midnightUTC,
            });

            if (employee.status === 'Present') {
                continue;
            }

            if (!attendanceRecord) {
                const newAttendance = new Attendance({
                    employee: employee._id,
                    date: midnightUTC,
                    status: 'Absent',
                });
                await newAttendance.save();
            }
        }

        console.log('Absentees marked successfully at IST midnight time.');
    } catch (error) {
        console.error('Error marking absentees:', error);
    }
});

module.exports = { checkIn, checkOut };
