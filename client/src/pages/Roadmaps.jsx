import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Roadmaps = () => {

  const navigate = useNavigate();
  const { user, logout, fetchUser } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [generating, setGenerating] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await API.get('api/roadmap/view');
        setRoadmaps(response.data.roadmaps);
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch roadmaps", err);
      }
    }
    fetchRoadmaps();
  }, [generating])

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await API.get("/api/roadmap/recommendations");
        setRecommendations(response.data.recommendations);
      } catch (err) {
        console.log("Failed to fetch recommendations", err);
      } finally {
        setLoadingRecommendations(false);
      }
    }
    fetchRecommendations();
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

  const generateRecommendation = async (skill) => {
    try {
      await API.post(`/api/roadmap/recommendations/${skill}`);
      navigate("/roadmaps");
    } catch (err) {
      console.log("Failed to generate the recommended roadmap", err);
    }
    setGenerating(null);
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide mx-8 mt-5'>
      <p>Loading your roadmaps...</p>
    </div>
  )

  return (
    <div className='h-screen w-full max-w-full flex flex-col px-2 py-4 gap-5 overflow-x-hidden mt-20'>

      <div className='h-screen w-full max-w-full overflow-x-hidden flex flex-col gap-6 bg-[#505081] rounded-2xl px-4 py-4 md:px-10 md:py-5'>

        {/* ── Your Roadmaps ── */}
        <div className='flex justify-between items-center px-2 py-2'>
          <p className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>
            Your Roadmaps
          </p>
          <button
            className='font-medium tracking-wide hover:scale-105 transition-all duration-300 cursor-pointer text-yellow-400 hover:text-yellow-300'
            onClick={() => navigate('/generate')}
          >
            + New Roadmap
          </button>
        </div>

        {/* Roadmap cards — mobile: stacked | pc: wrapping row */}
        <div className='flex flex-col gap-5 md:flex-row md:flex-wrap'>
          {roadmaps.length === 0 ? (
            <p className='ml-2 font-bold text-[17px] tracking-wide px-2 text-white'>No roadmaps yet. Generate your first one!</p>
          ) : (
            roadmaps.map((roadmap) => {
              const completedDays = roadmap.roadmap?.filter(d => d.completed).length ?? 0;
              const totalDays = roadmap.roadmap?.length ?? 28;
              const progress = Math.round((completedDays / totalDays) * 100);

              return (
                <div
                  key={roadmap._id}
                  className='w-full rounded-2xl overflow-hidden md:w-63.5 bg-[#272757] border border-[#3a3a7a]'
                >
                  {/* Card top — skill + personality */}
                  <div className='flex justify-between items-center px-4 py-3 border-b border-[#3a3a7a]'>
                    <div>
                      <p className='text-lg font-semibold tracking-wide capitalize text-[#f0f0ff]'>{roadmap.skill}</p>
                      <span className='text-xs uppercase tracking-widest text-yellow-400'>{roadmap.personalityType}</span>
                    </div>
                    {/* Initials avatar */}
                    <div className='flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-[#f0f0ff] bg-[#505081] border-2 border-[rgba(134,134,172,0.25)]'>
                      {roadmap.skill.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className='flex flex-col gap-2 px-4 py-3 border-b border-[#3a3a7a]'>
                    <div className='flex justify-between'>
                      <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-[#7070a8]'>Progress</span>
                      <span className='text-[14px] text-[#7070a8]'>{completedDays}/{totalDays} days</span>
                    </div>
                    <div className='h-1.5 rounded-full overflow-hidden bg-[#3a3a7a]'>
                      <div
                        className='h-full rounded-full bg-yellow-400 transition-all duration-500'
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2.5 px-4 py-3'>
                    <button
                      className='flex-1 py-2 rounded-xl text-[12px] font-medium tracking-[0.05em] text-black cursor-pointer hover:scale-105 transition-all duration-300 bg-yellow-400 hover:bg-yellow-300 ease-in-out'
                      onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                    >
                      View Roadmap
                    </button>
                    <button
                      className='px-4 py-2 rounded-xl text-[12px] font-medium text-black tracking-wide cursor-pointer hover:scale-105 transition-all duration-300 bg-red-400 hover:bg-red-300'
                      onClick={() => handleDelete(roadmap._id)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-[rgba(134,134,172,0.15)]' />

        {/* ── Action Buttons ── */}
        <div className='flex gap-4 px-2'>
          <button
            className='font-bold tracking-wider px-4 py-2 bg-[#272757] rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-yellow-400/30 text-yellow-400'
            onClick={() => navigate('/quiz')}
          >
            Retake Quiz
          </button>
          <button
            className='font-bold tracking-wider px-4 py-2 bg-[#272757] rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/[0.07] text-[#f0f0ff]'
            onClick={() => navigate('/generate')}
          >
            + New Roadmap
          </button>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-[rgba(134,134,172,0.15)]' />

        {/* ── Recommended For You ── */}
        <div className='flex justify-between items-center px-2 py-2'>
          <p className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>
            Recommended For You
          </p>
        </div>

        <div className='flex flex-col gap-5 pb-6 md:flex-row md:flex-wrap'>
          {loadingRecommendations ? (
            <p className='font-light tracking-wide px-2 text-[#7070a8]'>Loading recommendations...</p>
          ) : (
            recommendations.map((elem, index) => (
              <div
                key={index}
                className='flex flex-col w-full rounded-2xl overflow-hidden md:w-63.5 bg-[#272757] border border-[#3a3a7a]'
              >
                {/* Card top — skill name + avatar */}
                <div className='flex justify-between items-center px-4 py-3 border-b border-[#3a3a7a]'>
                  <div>
                    <p className='text-lg font-semibold tracking-wide capitalize text-[#f0f0ff]'>{elem.skill}</p>
                    <span className='text-xs uppercase tracking-widest text-yellow-400'>Recommended</span>
                  </div>
                  <div className='flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-[#f0f0ff] bg-[#505081] border-2 border-[rgba(134,134,172,0.25)]'>
                    {elem.skill.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                {/* What it does */}
                <div className='px-4 py-3 border-b border-[#3a3a7a]'>
                  <p className='text-[11px] font-semibold tracking-[0.09em] uppercase text-[#7070a8] mb-1'>What it does</p>
                  <p className='text-[13px] text-[#a0a0c8] leading-relaxed capitalize'>{elem.whatItDoes}</p>
                </div>

                {/* Why learn */}
                <div className='px-4 py-3 border-b border-[#3a3a7a]'>
                  <p className='text-[11px] font-semibold tracking-[0.09em] uppercase text-[#7070a8] mb-1'>Why learn it</p>
                  <p className='text-[13px] text-[#a0a0c8] leading-relaxed capitalize'>{elem.whyLearn}</p>
                </div>

                {/* Generate button */}
                <div className='px-4 py-3'>
                  <button
                    className='w-full py-2 rounded-xl text-[12px] font-medium tracking-wide text-black cursor-pointer hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:hover:scale-100 bg-yellow-400 hover:bg-yellow-300'
                    disabled={generating}
                    onClick={() => { setGenerating(elem.skill); generateRecommendation(elem.skill); }}
                  >
                    {generating === elem.skill ? 'Generating...' : 'Generate Roadmap'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Roadmaps
