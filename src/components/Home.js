import React from 'react'
import { useNavigate } from "react-router-dom"
export default function Home() {
  const navigate = useNavigate();
  function goToLogin() {
    navigate('/login');
  }
  return (
    <div className="bg-gray-100 h-[fit] p-10 flex justify-center items-center ">
      <div className="flex justify-center items-center bg-white shadow-2xl rounded-xl p-5 w-full max-w-3xl">
        <div className="text-left">
          {/* <!-- Introduction Section --> */}
          <h2 className="text-2xl font-bold mb-4 text-center">Introduction: Attendance Tracker</h2>
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Purpose:</strong> Automates the process of tracking employee attendance. Ensures accuracy, reduces manual errors, and saves time.</li>
            <li><strong>Target Audience:</strong> Organizations and businesses with a need for employee attendance management.</li>
            <li><strong>Technology Used:</strong> Backend: Node.js with Express, Frontend: ReactJS, Database: MongoDB.</li>
            <li><strong>Key Benefits:</strong> Enhances efficiency, transparency, and provides real-time attendance tracking and reporting.</li>
          </ul>

          {/* <!-- Features Section --> */}
          <h2 className="text-2xl font-bold mb-4 text-center">Features of Attendance Tracker</h2>
          <ul className="list-disc pl-5">
            <li><strong>Automatic Attendance Marking:</strong> Geo-location-based check-in and check-out for employees.</li>
            <li><strong>Manual Attendance:</strong> Option for employees to manually mark attendance for remote or off-site work.</li>
            <li><strong>Attendance History:</strong> Displays past attendance with date, check-in, check-out, and status (Present/Absent).</li>
            <li><strong>Filters and Search:</strong> Filter attendance by date or status (Present/Absent).</li>
            <li><strong>Alerts and Notifications:</strong> Alerts for successful check-ins, check-outs, and missed attendance.</li>
            <li><strong>User Authentication:</strong> Secure login for employees and admins using cookies.</li>
            <li><strong>Admin Dashboard:</strong> View and manage attendance records of all employees.</li>
            <li><strong>Time Zone Conversion:</strong> Attendance timestamps shown in the local time zone (e.g., IST).</li>
            <li><strong>Real-Time Reporting:</strong> Generate daily, weekly, or monthly attendance reports.</li>
            <li><strong>Scalable and Secure:</strong> Designed for seamless scalability and robust data security.</li>
          </ul>

          {/* <!-- Login Button --> */}
          <div className="mt-6 flex justify-center">
            <button className="text-white hover:font-bold text-xl font-semibold focus:border-white bg-red-600 hover:bg-red-500 rounded-lg p-2"
              onClick={goToLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
