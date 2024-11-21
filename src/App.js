import './App.css';
import { BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Componets
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import UserDashboard from './components/userComponents/UserDashboard';
import UserAttendance from './components/userComponents/UserAttendance'
import AdminDashboard from './components/adminComponents/AdminDashboard';
import Footer from './components/Footer';


function App() {
  const [actor, setActor] = useState(()=> localStorage.getItem('Actor') || "Guest");
  useEffect(()=>{
    // Update sessionStorage whenever User_Id changes
    if(!actor){
      setActor("Guest");
    }
    if (actor) {
      localStorage.setItem('Actor', actor);
    } else {
      localStorage.removeItem('Actor');
    }
  }, [actor]);

  const [User_Id, setUser_Id] = useState(() => localStorage.getItem('User_Id') || '');

  useEffect(() => {
    // Update sessionStorage whenever User_Id changes
    if (User_Id) {
      localStorage.setItem('User_Id', User_Id);
    } else {
      localStorage.removeItem('User_Id');
    }
  }, [User_Id]);

  const [Admin_Id, setAdmin_Id] = useState(() => localStorage.getItem('Admin_Id') || '');

  useEffect(() => {
    // Update sessionStorage whenever User_Id changes
    if (User_Id) {
      localStorage.setItem('Admin_Id', Admin_Id);
    } else {
      localStorage.removeItem('Admin_Id');
    }
  }, [User_Id]);


  return (
    <div className="">
      <Router>
        <Navbar actor={actor} setActor={setActor}/>
        <Routes>
            <Route path='/' element={<Home actor={actor}/>}/>
            <Route path='/login' element={<Login setActor={setActor} setUser_Id={setUser_Id} setAdmin_Id={setAdmin_Id}/>}/>
            <Route path="/userDashboard" element={<UserDashboard User_Id={User_Id}/>}/>
            <Route path="/checkUserAttendance" element={<UserAttendance User_Id={User_Id}/>}/>
            <Route path="/adminDashboard" element={<AdminDashboard User_Id={Admin_Id}/>}/>

        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
