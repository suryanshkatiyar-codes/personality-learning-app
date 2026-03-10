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
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center px-4'>
      <div className='w-full max-w-md'>

        {/* Heading */}
        <p className='text-zinc-500 text-xs tracking-widest uppercase mb-2'>
          AI Powered
        </p>
        <h1 className='text-4xl font-light mb-2'>
          Generate a <span className='text-yellow-400 italic'>Roadmap</span>
        </h1>
        <p className='text-zinc-500 text-sm mb-10'>
          Enter a skill and we'll build a personalized learning path based on your personality type.
        </p>

        {/* Form */}
        <form onSubmit={(e) => generateRoadmap(e)} className='flex flex-col gap-4'>

          <input
            type="text"
            placeholder='What do you want to learn?'
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className='border border-zinc-700 bg-zinc-900 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 w-full placeholder-zinc-600 transition-colors duration-200 text-sm tracking-wide rounded'
          />

          {error && (
            <p className='text-red-400 text-xs tracking-wide'>{error}</p>
          )}

          <button
            disabled={loading}
            className='bg-yellow-400 text-zinc-950 font-bold text-xs tracking-widest uppercase py-3 hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl'
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>

        </form>

      </div>
    </div>
  )
}

export default Generate