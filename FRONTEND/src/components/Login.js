import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({setActor, setUser_Id, setAdmin_Id}) {
    const [loginAs, setLoginAs] = useState();
    const [EmpId, setEmpId] = useState();
    const [Password, setPassword] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
      setActor("Guest");
    })

    async function handleSubmit(event){
      event.preventDefault();

      if(!loginAs){
        return alert("Please select a the login as button.");
      }
    
    const loginData = {
      EmpId: EmpId,
      Password: Password,
    };
    console.log(loginData);

    try {
      console.log("Request send");
      // Send login request with POST method and dynamic URL based on loginAs
      const response = await axios.post(`https://your-backend.onrender.com/login${loginAs}`, loginData, {
        withCredentials: true, // Include cookies in the request
      });
      console.log("response received");
          if(response.data.success){
            console.log('login successful');
            if(loginAs === 'Employee'){
              setActor('Employee');
              navigate("/userDashboard");
            }else{
              setActor('Admin');
              navigate("/adminDashboard");
            }
            
          }
        } catch (error) {
          console.log(error);
        }
    }
    
  return (
    <div className='bg-gray-300 h-[90vh] flex justify-center items-center px-6'>
        <div className='flex flex-col justify-center items-center bg-white shadow-2xl rounded-xl p-5'>

        <form className='flex flex-col justify-center items-start mt-4'
         method="POST"
         onSubmit={handleSubmit}
         encType="multipart/form-data"
         >
        <div className="flex mb-3">
            <button
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg mr-2 ${loginAs === "Employee" ? "bg-red-600 hover:opacity-80 text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setLoginAs("Employee")}
            >
              Login as Employee
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg ${loginAs === "Admin" ? "bg-red-600 hover:opacity-80 text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setLoginAs("Admin")}
            >
              Login as Admin
            </button>
          </div>
          <input
            type="text"
            name="EmpId"
            placeholder="EmpId"
            className="w-full mb-3 p-2 border rounded-lg"
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Set Password"
            className="w-full mb-3 p-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between mb-3">
            <button className="text-red-600 hover:opacity-70 font-semibold">Forgot password?</button>
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-red-600 hover:opacity-80 text-white py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>
        </div>
    </div>
  )
}
