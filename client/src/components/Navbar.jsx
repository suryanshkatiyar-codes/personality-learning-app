import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className='bg-zinc-950 border-b border-zinc-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50'>
      
      {/* Logo */}
      <div 
        onClick={() => navigate('/')} 
        className='text-yellow-400 font-bold text-xl tracking-widest uppercase cursor-pointer'
      >
        Learner
      </div>

      {/* Links */}
      <div className='flex items-center gap-8'>
        {user ? (
          // Logged in links
          <>
            <Link 
              to='/' 
              className='text-zinc-400 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200'
            >
              Home
            </Link>
            <Link 
              to='/dashboard' 
              className='text-zinc-400 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200'
            >
              Dashboard
            </Link>
            <Link 
              to='/quiz' 
              className='text-zinc-400 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200'
            >
              Quiz
            </Link>
            <button 
              onClick={logOut}
              className='bg-yellow-400 text-zinc-950 px-5 py-2 text-sm font-bold tracking-wider uppercase hover:bg-yellow-300 active:scale-95 transition-all duration-200'
            >
              Logout
            </button>
          </>
        ) : (
          // Logged out links
          <>
            <Link 
              to='/' 
              className='text-zinc-400 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200'
            >
              Home
            </Link>
            <Link 
              to='/login' 
              className='text-zinc-400 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200'
            >
              Login
            </Link>
            <Link 
              to='/register'
              className='bg-yellow-400 text-zinc-950 px-5 py-2 text-sm font-bold tracking-wider uppercase hover:bg-yellow-300 active:scale-95 transition-all duration-200'
            >
              Get Started
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar