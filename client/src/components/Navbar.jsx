import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logOut = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  }

  return (
    <nav className='fixed top-2 left-2 right-2 bg-[#8686ac] border-b border-black px-8 py-4 flex flex-col z-50 rounded-4xl' font-medium>

      {/* Top row */}
      <div className='flex justify-between items-center'>

        {/* Logo */}
        <div className='text-yellow-400 font-bold text-xl tracking-widest uppercase'>
          Learner<span className='text-black'>.</span>
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8'>
          {user ? (
            <>
              <Link to='/dashboard' className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium'>
                Home
              </Link>
              <Link to='/dashboard' className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium'>
                Dashboard
              </Link>
              <Link to='/roadmaps' className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium'>
                Roadmaps
              </Link>
              <button
                onClick={logOut}
                className='bg-yellow-400 text-black px-5 py-2 rounded-2xl text-sm font-bold tracking-wide uppercase hover:bg-yellow-300 active:scale-90 transition-all duration-300 ease-in-out cursor-pointer'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/' className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium'>
                Home
              </Link>
              <Link to='/login' className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium'>
                Login
              </Link>
              <Link to='/register' className='bg-yellow-400 text-black px-5 py-2 rounded-2xl text-sm font-bold tracking-wide uppercase hover:bg-yellow-300 active:scale-90 transition-all duration-300 ease-in-out'>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className='md:hidden flex flex-col gap-1.5 cursor-pointer'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden flex flex-col gap-3 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 mt-4 pb-2' : 'max-h-0'}`}>
        {user ? (
          <>
            <Link to='/dashboard' onClick={() => setMenuOpen(false)} className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium ease-in-out'>
              Home
            </Link>
            <Link to='/dashboard' onClick={() => setMenuOpen(false)} className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium ease-in-out'>
              Dashboard
            </Link>
            <Link to='/roadmaps' onClick={() => setMenuOpen(false)} className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium ease-in-out'>
              Roadmaps
            </Link>
            <button
              onClick={logOut}
              className='bg-yellow-400 text-black px-5 py-2 text-sm font-bold tracking-wider uppercase hover:bg-yellow-300 active:scale-95 transition-all duration-200 rou rounded-2xl w-full ease-in-out cursor-pointer'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/' onClick={() => setMenuOpen(false)} className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium ease-in-out'>
              Home
            </Link>
            <Link to='/login' onClick={() => setMenuOpen(false)} className='text-black hover:text-white hover:bg-black py-2 px-3 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 font-medium ease-in-out'>
              Login
            </Link>
            <Link to='/register' onClick={() => setMenuOpen(false)} className='bg-yellow-400 text-black px-5 py-2 rounded-2xl text-sm font-bold tracking-wide uppercase hover:bg-yellow-500 active:scale-90 transition-all duration-300 text-center ease-in-out'>
              Get Started
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar