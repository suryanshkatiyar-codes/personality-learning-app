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
      <div>
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <input type="text" onChange={(e) => {
            setUsername(e.target.value);
          }} value={username} placeholder='Enter your Name' />
          <input type="text" onChange={(e) => {
            setEmail(e.target.value);
          }} value={email} placeholder='Enter your Email' />
          <input type="text" onChange={(e) => {
            setPassword(e.target.value);
          }} value={password} placeholder='Enter your Password' />
          {/* Show error message if exists */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
