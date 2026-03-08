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
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center px-4'>
      <div className='w-full max-w-md'>

        {/* Heading */}
        <p className='text-zinc-500 text-xs tracking-widest uppercase mb-2'>
          Create account
        </p>
        <h1 className='text-4xl font-light mb-2'>
          Join <span className='text-yellow-400 italic'>Learner</span>
        </h1>
        <p className='text-zinc-500 text-sm mb-10'>
          Sign up to discover your learning style and get your personalized roadmap.
        </p>

        {/* Form */}
        <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-4'>

          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Enter your Name'
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide'
          />

          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Enter your Email'
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide'
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter your Password'
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide'
          />

          {/* Error message */}
          {error && (
            <p className='text-red-400 text-xs tracking-wide'>{error}</p>
          )}

          <button className='bg-yellow-400 text-zinc-950 font-bold text-xs tracking-widest uppercase py-3 hover:bg-yellow-300 active:scale-95 transition-all duration-200'>
            Submit
          </button>

        </form>

        {/* Login link */}
        <p className='text-zinc-600 text-xs text-center mt-6'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors duration-200'
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register