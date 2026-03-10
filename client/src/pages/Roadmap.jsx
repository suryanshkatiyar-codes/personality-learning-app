import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Roadmap = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await API.get(`/api/roadmap/${id}`);
        setRoadmap(response.data.roadmap);
      } catch (err) {
        console.log("Failed to fetch that particular roadmap", err);
      }
      setLoading(false);
    }
    fetchRoadmap();
  }, [])

  if (loading) return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center'>
      <p className='text-zinc-500 text-xs tracking-widest uppercase animate-pulse'>
        Loading roadmap...
      </p>
    </div>
  )

  return (
    <div className='min-h-screen bg-zinc-950 text-white'>

      {/* Header */}
      <div className='border-b border-zinc-800 px-8 py-8'>
        <div className='max-w-3xl mx-auto'>

          <button
            onClick={() => navigate('/dashboard')}
            className='text-zinc-500 hover:text-yellow-400 text-xs tracking-widest uppercase transition-colors duration-200 mb-6 flex items-center gap-2'
          >
            ← Back
          </button>

          <p className='text-zinc-500 text-xs tracking-widest uppercase mb-2'>
            Your Roadmap
          </p>
          <h1 className='text-4xl font-light mb-3 capitalize'>
            {roadmap.skill}
          </h1>
          <span className='bg-yellow-400 text-zinc-950 text-xs font-bold px-3 py-1 tracking-widest uppercase rounded'>
            {roadmap.personalityType}
          </span>

        </div>
      </div>

      {/* Roadmap Content */}
      <div className='max-w-3xl mx-auto px-8 py-10'>
        <p className='text-zinc-500 text-xs tracking-widest uppercase mb-6'>
          Learning Path
        </p>
        <div className='text-zinc-300 text-sm leading-8 whitespace-pre-wrap border border-zinc-800 bg-zinc-900 p-8 rounded'>
          {roadmap.roadmap}
        </div>
      </div>

    </div>
  )
}

export default Roadmap