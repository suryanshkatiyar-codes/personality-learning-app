import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { login } = useAuth;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
    else {
      setError(result.message);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center px-4'>
      <div className='w-full max-w-md'>

        {/* Heading */}
        <p className='text-zinc-500 text-xs tracking-widest uppercase mb-2'>
          Welcome back
        </p>
        <h1 className='text-4xl font-light mb-2'>
          Login to <span className='text-yellow-400 italic'>Learner</span>
        </h1>
        <p className='text-zinc-500 text-sm mb-10'>
          Enter your credentials to access your dashboard and roadmaps.
        </p>

        {/* Form */}
        <form onSubmit={(e) => formHandler(e)} className='flex flex-col gap-4'>

          <input
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide'
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeholder='Enter email'
          />

          <input
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide'
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder='Enter password'
          />

          {/* Error message */}
          {error && (
            <p className='text-red-400 text-xs tracking-wide'>{error}</p>
          )}

          <button className='bg-yellow-400 text-zinc-950 font-bold text-xs tracking-widest uppercase py-3 hover:bg-yellow-300 active:scale-95 transition-all duration-200'>
            Submit
          </button>

        </form>

        {/* Register link */}
        <p className='text-zinc-600 text-xs text-center mt-6'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors duration-200'
          >
            Register
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login