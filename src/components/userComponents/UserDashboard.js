import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkedOut, setCheckedOut] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Enable check-in button only between 8:00 am and 10:00 am
            if (hours >= 8 && hours < 10) {
                setCheckedIn(false);
            } else {
                setCheckedIn(true);
            }

            // Enable check-out button if user has checked in and it is after 6:00 pm
            if (checkedIn && hours >= 18) {
                setCheckedOut(false);
            }
        }, 60000); // Check every minute

        return () => clearInterval(timer);
    }, [checkedIn]);

    async function checkIn() {
        try {
            const response = await axios.post(`http://localhost:8000/checkIn`, {}, { withCredentials: true });
            
            if (response.data.success) {
                setCheckedIn(true);
                setCheckedOut(false);
    
                // Convert the UTC date string to a JavaScript Date object
                const checkInDate = new Date(response.data.date);
    
                // Convert to IST (Indian Standard Time)
                const options = {
                    weekday: 'short',  // Optional: day of the week (e.g., "Mon")
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',  // Set to IST (Indian Standard Time)
                };
    
                // Format the date using toLocaleString with IST timezone
                const formattedDate = checkInDate.toLocaleString('en-IN', options);
    
                // Show the formatted date in the alert
                alert(`Check in successfully at ${formattedDate}`);
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            alert(`An error occurred, ${error.message}`);
            console.log(error);
        }
    }
    
    

    async function checkOut() {
        try {
            const response = await axios.post(`http://localhost:8000/checkOut`, {}, { withCredentials: true });
            if (response.data.success) {
                setCheckedOut(true);
                // Convert the UTC date string to a JavaScript Date object
                const checkOutDate = new Date(response.data.date);
    
                // Convert to IST (Indian Standard Time)
                const options = {
                    weekday: 'short',  // Optional: day of the week (e.g., "Mon")
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',  // Set to IST (Indian Standard Time)
                };
    
                // Format the date using toLocaleString with IST timezone
                const formattedDate = checkOutDate.toLocaleString('en-IN', options);
    
                // Show the formatted date in the alert
                alert(`Check out successfully at ${formattedDate}`);
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            alert(`An error occurred, ${error.message}`);
            console.log(error);
        }
    }

    return (
        <div className='bg-gray-300 h-[90vh] flex justify-center items-center px-6'>
            <div className='flex justify-center items-center bg-white shadow-2xl rounded-xl p-5'>
                <div className="w-full flex flex-col md:flex-row">
                    <button
                        type="button"
                        className='flex-1 px-4 py-2 m-2 rounded-lg bg-red-600 hover:opacity-80 text-white'
                        onClick={checkIn}
                        // disabled={checkedIn || !(new Date().getHours() >= 8 && new Date().getHours() < 10)}
                    >
                        Check in
                    </button>
                    
                    <button
                        type="button"
                        className='flex-1 px-4 py-2 m-2 rounded-lg bg-red-600 hover:opacity-80 text-white'
                        onClick={checkOut}
                        // disabled={checkedOut || !(new Date().getHours() >= 18 || checkedIn)}
                    >
                        Check out
                    </button>
                    
                    <button
                        type="button"
                        className='flex-1 px-4 py-2 m-2 rounded-lg bg-red-600 hover:opacity-80 text-white'
                        onClick={()=> navigate('/checkUserAttendance')}
                    >
                        Check Attendance History
                    </button>
                </div>
            </div>
        </div>
    );
}
