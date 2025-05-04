import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [searchEmployee, setSearchEmployee] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Fetch employees on component mount
    useEffect(() => {
        async function fetchEmployees() {
            try {
                console.log("Request send")
                const response = await axios.get('https://your-backend.onrender.com/employees');
                if (response.data.success) {
                    console.log("Response success", response.data.data);
                    setEmployees(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, []);

    async function fetchAttendanceHistory(empId) {
        try {
            console.log(empId);
            const response = await axios.get(`https://attendance-tracker-backend-m4fu.onrender.com/${empId}/attendance`, {
                params: {
                    date: searchDate,
                    status: filterStatus,
                }
            });
            if (response.data.success) {
                setAttendanceHistory(response.data.data);
            } else {
                console.log(response.data.message); // Log message if no data found
            }
        } catch (error) {
            console.error('Error fetching attendance history:', error);
        }
    }
    

    return (
        <div className="h-[90vh] p-5">
            <h2>Employee List</h2>
            <input
                type="text"
                placeholder="Search by name or Emp ID"
                className="border p-2 mb-2"
                value={searchEmployee}
                onChange={(e) => setSearchEmployee(e.target.value)}
            />
            <table className="table-auto border-collapse border border-gray-500 w-full">
                <thead>
                    <tr>
                        <th className="border p-2">Emp ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {employees
                        .filter(emp => emp.FullName.includes(searchEmployee) || emp.EmpId.includes(searchEmployee))
                        .map((emp) => (
                            <tr
                                key={emp.EmpId}
                                className="cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    setSelectedEmployee(emp);
                                    fetchAttendanceHistory(emp.EmpId);
                                    console.log(emp.EmpId);
                                }}
                            >
                                <td className="border p-2">{emp.EmpId}</td>
                                <td className="border p-2">{emp.FullName}</td>
                                <td className="border p-2">{emp.Gender}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <div className="mt-5">
                    <h3>Attendance History for {selectedEmployee.name}</h3>
                    <input
                        type="date"
                        className="border p-2 mr-2"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <select
                        className="border p-2 mr-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                    <button
                        className="bg-blue-500 text-white p-2"
                        onClick={() => fetchAttendanceHistory(selectedEmployee.EmpId)}
                    >
                        Search
                    </button>
                    <table className="table-auto border-collapse border border-gray-500 w-full mt-3">
                        <thead>
                            <tr>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Check In Time</th>
                                <th className="border p-2">Check Out Time</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceHistory.map((record, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="border p-2">{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : 'N/A'}</td>
                                    <td className="border p-2">{record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : 'N/A'}</td>
                                    <td className="border p-2">{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
