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

  async function taskCompleted(dayIndex, subtaskIndex, completed) {
    try {
      const response = await API.patch(`/api/roadmap/progress/${id}`, { dayIndex, subtaskIndex, completed });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      console.log("Failed to fetch the roadmap", err);
    }
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide'>
      <p>Loading roadmap...</p>
    </div>
  )

  const completedDays = roadmap.roadmap?.filter(d => d.completed).length ?? 0;
  const totalDays = roadmap.roadmap?.length ?? 0;
  const progress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <div className='min-h-screen w-full max-w-full flex flex-col px-2 py-4 overflow-x-hidden mt-20'>

      <div className='w-full flex flex-col bg-[#505081] rounded-2xl px-4 py-4 md:px-10 md:py-5'>

        {/* Everything constrained to max-w-3xl and centered */}
        <div className='w-full max-w-3xl mx-auto flex flex-col gap-5'>

          {/* ── Header ── */}
          <div className='flex flex-col gap-4 px-2 py-2 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-medium tracking-wide uppercase text-black'>Your Roadmap</p>
              <h1 className='text-3xl font-bold tracking-wider text-[#f0f0ff] capitalize'>{roadmap.skill}</h1>
            </div>
            <div className='flex items-center gap-3'>
              <span className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl text-yellow-400 border border-yellow-400/30'>
                {roadmap.personalityType}
              </span>
              <button
                className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/[0.07] text-[#f0f0ff]'
                onClick={() => navigate(`/roadmap/${id}/quiz`)}
              >
                Take Quiz →
              </button>
            </div>
          </div>

          {/* ── Overall Progress ── */}
          <div className='rounded-2xl overflow-hidden bg-[#272757] border border-[#3a3a7a]'>
            <div className='flex justify-between items-center px-5 py-3 border-b border-[#3a3a7a]'>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-[#7070a8]'>Overall Progress</span>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-yellow-400'>{completedDays}/{totalDays} days · {progress}%</span>
            </div>
            <div className='px-5 py-3'>
              <div className='h-1.5 rounded-full overflow-hidden bg-[#3a3a7a]'>
                <div
                  className='h-full rounded-full bg-yellow-400 transition-all duration-500'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Section header ── */}
          <div className='flex justify-between items-center px-2 py-1'>
            <p className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>
              Learning Path
            </p>
          </div>

          {/* ── Day cards ── */}
          <div className='flex flex-col gap-4 pb-6'>
            {roadmap.roadmap.map((elem) => {
              const completedSubtasks = elem.subtasks.filter(t => t.completed).length;
              const totalSubtasks = elem.subtasks.length;

              return (
                <div
                  key={elem._id}
                  className={`rounded-2xl overflow-hidden bg-[#272757] border ${elem.completed ? 'border-yellow-400/30' : 'border-[#3a3a7a]'}`}
                >
                  {/* Day header */}
                  <div className='flex items-center gap-3 px-5 py-3 border-b border-[#3a3a7a]'>
                    <div className='flex-1 flex items-center gap-2'>
                      <span className='text-yellow-400 text-[14px] font-bold tracking-[0.09em] uppercase'>
                        Day {elem.day}
                      </span>
                      <span className='text-[#3a3a7a]'>·</span>
                      <span className={`text-[15px] font-medium tracking-wide ${elem.completed ? 'line-through text-[#7070a8]' : 'text-[#f0f0ff]'}`}>
                        {elem.topic}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 flex-shrink-0'>
                      <span className='text-[12px] text-[#7070a8]'>{completedSubtasks}/{totalSubtasks}</span>
                      <input
                        type='checkbox'
                        checked={elem.completed}
                        onChange={() => {}}
                        className='w-4 h-4 accent-yellow-400 cursor-pointer'
                      />
                    </div>
                  </div>

                  {/* Subtasks */}
                  <div className='px-5 py-3 flex flex-col gap-2'>
                    {elem.subtasks.map((task, index) => (
                      <div key={task._id} className='flex items-start gap-3 py-1'>
                        <span className={`text-[14px] leading-relaxed flex-1 ${task.completed ? 'line-through text-[#7070a8]' : 'text-[#a0a0c8]'}`}>
                          {task.task}
                        </span>
                        <input
                          type='checkbox'
                          checked={task.completed}
                          onChange={(e) => taskCompleted(elem.day - 1, index, e.target.checked)}
                          className='w-3.5 h-3.5 mt-0.5 accent-yellow-400 cursor-pointer flex-shrink-0'
                        />
                      </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Roadmap
