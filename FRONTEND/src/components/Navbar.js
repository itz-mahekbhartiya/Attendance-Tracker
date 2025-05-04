import React from 'react'
import Cookies from 'js-cookie';
import {Link,useNavigate} from "react-router-dom"
export default function Navbar({actor, setActor}) {
  const navigate = useNavigate();
  console.log(actor)
  function goToLogin(){
    navigate("/login");
  }
  function logout(){
    Cookies.remove('EmpId');
    Cookies.remove('token');
    localStorage.clear();
    setActor('Guest');
    navigate("/");
  }
  return (
    <nav className='h-[6vh] md:h-[10vh] bg-red-600 flex justify-between items-center text-white p-6'>
      <div>
      <Link to="/"><span className='font-semibold hover:font-bold'>Attendance Tracker</span></Link>
      </div>
      { 
      actor === 'Guest' && 
      <div className='hidden md:block'>
        <button 
        className='border border-white rounded-lg px-2 font-semibold hover:border-2' 
        onClick={goToLogin}>Login</button>
      </div>
      }
      { 
      (actor == 'Admin' || actor == 'Employee') && 
      <div className='hidden md:block'>
        <button className='border border-white rounded-lg px-2 font-semibold hover:border-2' 
        onClick={logout}>
          Logout
        </button>
      </div>
      }

    </nav>
  )
}
