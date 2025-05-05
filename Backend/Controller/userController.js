const cron = require('node-cron');
const { Employee, Attendance } = require('../Model/Employee'); // Assuming models are in a separate file

async function checkIn(req, res) {
    const empId = req.cookies.EmpId;
    try {
        console.log("CheckIn EmpId:", empId);
        console.log("CheckIn Cookies:", req.cookies);
        // Find the employee by EmpId
        const employee = await Employee.findOne({ EmpId: empId });
        if (!employee) {
            console.log('Employee not found:', empId);
            console.log('Employee not found:', employee);
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if an attendance record already exists for today
        let attendance = await Attendance.findOne({ employee: employee._id, date: today });
        if (attendance) {
            return res.status(400).json({ success: false , message: 'Already checked in for today' });
        }

        // Create a new attendance record with the check-in time
        attendance = new Attendance({
            employee: employee._id,
            date: today,
            checkInTime: new Date(),
            status: 'Present'
        });

        // Save the attendance record
        await attendance.save();

        // Return success response

        return res.status(200).json({ success: true, message: 'Check-in successful', attendance, date: new Date() });
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ success: false, message: 'Check-in failed', error: error.message });
    }
}


async function checkOut(req, res) {
    const empId = req.cookies.EmpId;
    try {
        // Find the employee by EmpId
        const employee = await Employee.findOne({ EmpId: empId });
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if an attendance record exists for today with a check-in time
        let attendance = await Attendance.findOne({ employee: employee._id, date: today });
        if (!attendance || !attendance.checkInTime) {
            return res.status(400).json({ success: false, message: 'No check-in record found for today' });
        }

        // Check if the employee has already checked out
        if (attendance.checkOutTime) {
            return res.status(400).json({ success: false, message: 'Already checked out for today' });
        }

        // Update the attendance record with the check-out time
        attendance.checkOutTime = new Date();
        await attendance.save();

        // Return success response with check-out details
        return res.status(200).json({ success: true, message: 'Check-out successful', date: attendance.checkOutTime });
    } catch (error) {
        console.error('Check-out error:', error);
        res.status(500).json({ success: false, message: 'Check-out failed', error: error.message });
    }
}

// Schedule the job to run every day at 10:01 AM IST
cron.schedule('9 10 * * *', async () => {
    try {
        console.log("Automatic absentee marking triggered.");

        // Calculate today's date in IST and convert to UTC for consistent storage
        const dateUTC = new Date();
        const todayIST = new Date(dateUTC.getTime() + (5 * 60 + 30) * 60 * 1000);
        todayIST.setHours(0, 0, 0, 0);

        // Convert back to UTC for storage at IST midnight
        const midnightUTC = new Date(todayIST.getTime() - (5 * 60 + 30) * 60 * 1000);

        const allEmployees = await Employee.find();

        for (const employee of allEmployees) {
            const attendanceRecord = await Attendance.findOne({
                employee: employee._id,
                date: midnightUTC,
            });

            if(employee.status === 'Present'){
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
