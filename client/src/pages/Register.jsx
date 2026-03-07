import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Register = () => {

  const { register } = useAuth();
  const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');

  const submitHandler = async(e) => {
    e.preventDefault();
    const result=await register(username,email,password);
    if(result.success){
      navigate('/dashboard');
      return;
    }
    else{
      setError(result.message);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div>
      <div className='h-screen flex items-center justify-center'>
        <form onSubmit={(e) => {
          submitHandler(e);
        }} className='flex flex-col gap-2 justify-center border-2 p-25 rounded-2xl'>
          <input type="text" onChange={(e) => {
            setUsername(e.target.value);
          }} value={username} placeholder='Enter your Name' className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'/>
          <input type="text" onChange={(e) => {
            setEmail(e.target.value);
          }} value={email} placeholder='Enter your Email' className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'/>
          <input type="text" onChange={(e) => {
            setPassword(e.target.value);
          }} value={password} placeholder='Enter your Password' className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'/>
          {/* Show error message if exists */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='bg-white text-black rounded p-2 active:scale-95 active:text-white active:bg-black'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
