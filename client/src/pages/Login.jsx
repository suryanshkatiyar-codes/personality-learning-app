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
    <div>
      <div className='h-screen flex justify-center items-center'>
        <form onSubmit={(e) => {
          formHandler(e);
        }} className="flex flex-col gap-2 justify-center border-1 p-25 rounded-2xl">
          <input className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'
          onChange={(e) => {
            setEmail(e.target.value);
          }} type="text" value={email} placeholder='Enter email' />
          <input className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'
          onChange={(e) => {
            setPassword(e.target.value);
          }} type="text" value={password} placeholder='Enter password' />
          {/* Show error message if exists */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='bg-white text-black rounded p-2 active:scale-95 active:text-white active:bg-black'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
