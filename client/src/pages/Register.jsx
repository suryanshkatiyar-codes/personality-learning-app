import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {

  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(username, email, password);
    if (result.success) {
      navigate('/dashboard');
      return;
    }
    else {
      setError(result.message);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='min-h-screen w-full p-3 md:p-4 mt-20'>
      <div className='min-h-screen md:h-155 w-full bg-[#505081] flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-10 p-4 md:p-5 rounded-3xl md:rounded-4xl'>

        {/* Image — hidden on mobile */}
        <div className='hidden md:block w-1/2 h-full overflow-hidden bg-amber-500 rounded-4xl'>
          <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>

        {/* Form section */}
        <div className='w-full md:w-1/2 h-full bg-[#505081] rounded-3xl md:rounded-4xl flex flex-col gap-8 md:gap-10 justify-center items-center py-10 md:py-0'>

          <div className='font-medium text-2xl md:text-3xl tracking-wider text-center px-4'>
            <p>Create account, Join <span className='text-yellow-300'>Learner.</span></p>
          </div>

          <div className='w-full px-6 md:px-8'>
            <form className='flex flex-col justify-between items-center gap-5' onSubmit={(e) => submitHandler(e)}>

              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='Enter your Name'
                className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder-zinc-500"
              />

              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Enter your Email'
                className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder-zinc-500"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter your Password'
                className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder-zinc-500"
              />

              {error && (
                <p className='text-red-500 text-sm tracking-wide font-medium'>{error}</p>
              )}

              <button className='w-full md:w-auto bg-yellow-400 py-3 px-16 rounded-2xl hover:bg-yellow-300 cursor-pointer active:scale-90 transition-all duration-300 ease-in-out text-black font-medium'>
                Submit
              </button>

            </form>

            <p className='mt-8 tracking-wide font-medium text-center'>
              Already have an account?{' '}
              <span className="text-yellow-400 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register