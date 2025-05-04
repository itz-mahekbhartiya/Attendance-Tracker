import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function UserAttendance({User_Id}) {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [searchEmployee, setSearchEmployee] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Fetch employees on component mount
    useEffect(() => {
        const empId = Cookies.get('EmpId');  // Fetches the user_id cookie value
        console.log("EmpId",empId);
        async function fetchAttendanceHistory(empId) {
            try {
                console.log(empId);
                const response = await axios.get(`https://attendance-tracker-backend-m4fu.onrender.com/${empId}/attendance`, {}, { withCredentials: true });
                if (response.data.success) {
                    setAttendanceHistory(response.data.data);
                } else {
                    console.log(response.data.message); // Log message if no data found
                }
            } catch (error) {
                console.error('Error fetching attendance history:', error);
            }
        }
        fetchAttendanceHistory(empId);
    }, []);


  return (
    <div className='bg-gray-300 h-[90vh] flex justify-center items-center px-6'>
            <div className='flex justify-center items-center bg-white shadow-2xl rounded-xl p-5'>
            <div className="mt-5">
                    <h3>Attendance History for {User_Id}</h3>
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
            </div>
   </div>
  )
}
