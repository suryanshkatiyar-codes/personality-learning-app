import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Generate = () => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRoadmap = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await API.post('/api/roadmap/generate', {
        skill,
      });
      navigate('/dashboard');
    } catch (err) {
      console.log("Failed to generate roadmap", err);
      setError(err.response?.data?.message || 'Failed to generate roadmap');
    }
    setLoading(false);
  }

  return (
    <div className='p-2 mt-21.5 rounded-2xl'>
      <div className='h-screen w-full flex justify-center items-center bg-[#505081] rounded-2xl'>
        <div className='flex flex-col md:gap-10 gap-2 px-10 py-15 bg-[#272757] rounded-2xl'>
          <div className='p-2 md:p-0'>
            <p className='text-2xl md:text-3xl tracking-wider'>AI Powered</p>
            <h1>Generate a <span className='md:text-base text-base text-yellow-400'>Roadmap</span></h1>
            <p className='text-base md:text-xl md:font-medium'>Enter a skill and we'll build a personalized</p>
            <p className='text-base md:text-xl md:font-medium'>learning path based on your personality type.</p>
          </div>

          <form className='p-2 md:p-0' onSubmit={(e) => generateRoadmap(e)}>

            <input
              type="text"
              placeholder='What do you want to learn?'
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className='w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder-zinc-500'
            />

            {error && (
              <p className='mt-1 ml-1 text-red-500 font-medium tracking-wide'>{error}</p>
            )}
            <div className='flex items-center justify-center'>
              <button disabled={loading} className='mt-5 bg-yellow-400 hover:bg-yellow-300 text-black font-medium tracking-wide cursor-pointer active:scale-90 transition-all duration-300 px-18 py-2 rounded-2xl'>
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>


      </div>
    </div>
  )
}

export default Generate