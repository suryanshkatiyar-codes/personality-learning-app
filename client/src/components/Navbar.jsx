import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate=useNavigate();

  const logOut=()=>{
    logout();
    navigate('/login');
  }

  return (
    <div className='bg-red-400 p-7 flex justify-between items-center '>
      <div>Learner</div>
      <div className='w-100'>
        {user ? (
          <div className='w-full gap-20 flex justify-center items-center'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/'>Know more</Link>
          </div>
        ) : (
          <div className='w-full flex justify-between items-center'>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/quiz'>Quiz</Link>
            <button onClick={logOut}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
