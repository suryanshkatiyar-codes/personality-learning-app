import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {

  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [personalitytype, setPersonalitytype] = useState('');
  const [email, setEmail] = useState('');
  const [roadmaps, setRoadmaps] = useState([]);

  // useEffect(() => {
  //   try {
  //     if (!loading) {
  //       setUsername(user.username);
  //       setEmail(user.email);
  //       setPersonalitytype(user.personalityType);
  //     }
  //   } catch (err) {
  //     console.log("Failed in retrieving info", err);
  //   }
  // }, [])

  useEffect(() => {
    const fetchRoadmaps = async() => {
      try {
        const response = await API.get('api/roadmap/view');
        setRoadmaps(response.data.roadmap);
      } catch (err) {
        console.log("Failed to fetch roadmaps", err);
      }
    }
    fetchRoadmaps();
  }, [])

  const logOut = () => {
    logout();
    navigate('/login');
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/roadmap/${id}`);
      setRoadmaps(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.log("Failed to delete roadmap", err);
    }
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white'>

      {/* Top Bar */}
      <div className='border-b border-zinc-800 px-8 py-8'>
        <div className='max-w-5xl mx-auto flex justify-between items-start'>

          {/* User Info */}
          <div>
            <p className='text-zinc-500 text-xs tracking-widest uppercase mb-1'>Welcome back</p>
            <h1 className='text-3xl font-light mb-3'>Hii {user.username}</h1>
            <div className='flex items-center gap-4'>
              <span className='text-zinc-500 text-sm'>Personality type {user.personalityType}</span>
              <span className='text-zinc-500 text-sm'>Email {user.email}</span>
            </div>
          </div>

          {/* Logout */}
          <div
            onClick={() => logOut()}
            className='text-zinc-500 hover:text-red-400 text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200'
          >
            Logout
          </div>

        </div>
      </div>

      {/* Roadmaps */}
      <div className='max-w-5xl mx-auto px-8 py-10'>
        <p className='text-zinc-500 text-xs tracking-widest uppercase mb-6'>Your Roadmaps</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className='border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-600 transition-all duration-200'
            >
              <div className='mb-4'>
                <span className='text-yellow-400 text-xs tracking-widest uppercase'>
                  {roadmap.personalityType}
                </span>
                <h3 className='text-xl font-light mt-1 capitalize'>{roadmap.skill}</h3>
              </div>
              <div className='flex items-center gap-2 mt-6'>
                <button
                  onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                  className='flex-1 border border-zinc-700 text-zinc-400 hover:text-white hover:border-yellow-400 py-2 text-xs tracking-widest uppercase transition-all duration-200'
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(roadmap._id)}
                  className='border border-zinc-700 text-zinc-600 hover:text-red-400 hover:border-red-400 px-3 py-2 text-xs tracking-widest uppercase transition-all duration-200'
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Buttons */}
      <div className='max-w-5xl mx-auto px-8 pb-10 flex gap-3'>
        <button
          onClick={() => navigate('/quiz')}
          className='border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200'
        >
          Take quiz again
        </button>
        <button
          onClick={() => navigate('/generate')}
          className='bg-yellow-400 text-zinc-950 hover:bg-yellow-300 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200'
        >
          New roadmap
        </button>
      </div>

    </div>
  )
}

export default Dashboard