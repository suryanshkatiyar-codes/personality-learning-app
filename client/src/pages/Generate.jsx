import React, { useState } from 'react'
import {useAuth} from '../context/AuthContext';
import API from '../api/axios';
import {useNavigate} from 'react-router-dom';

const Generate = () => {
  
  const navigate=useNavigate();
  const {user}=useAuth();
  const[skill,setSkill]=useState('');
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState('');

  const generateRoadmap=async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
      const response=await API.post('/api/roadmap/generate',{
        skill,
      });
      navigate('/dashboard');
    }catch(err){
      console.log("Failed to generate roadmap",err);
      setError(err.response?.data?.message || 'Failer to generate roadmap');
    }
    setLoading(false);
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={(e)=>{
        generateRoadmap(e);
      }}>
        <div>Roadmap generator</div>
        <input type="text" 
        placeholder='What u want to learn' 
        value={skill} 
        className='border border-zinc-700 bg-zinc-900 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-300 w-full placeholder-zinc-500 transition-colors duration-200'
        onChange={(e)=>{
          setSkill(e.target.value);
        }}/>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button disabled={loading} className='bg-white text-black rounded p-2 active:scale-95 active:text-white active:bg-black'>{loading?'Generating....':'Generate'}</button>
      </form>
    </div>
  )
}

export default Generate
