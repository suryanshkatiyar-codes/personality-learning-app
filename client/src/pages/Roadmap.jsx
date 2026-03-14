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

  async function taskCompleted(dayIndex, subtaskIndex, completed){
    try{
      const response=await API.patch(`/api/roadmap/progress/${id}`,{dayIndex, subtaskIndex, completed});
      setRoadmap(response.data.roadmap);
    }catch(err){
      console.log("Failed to fetch the roadmap",err);
    }
  }

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

        <div className='space-y-4'>
          {roadmap.roadmap.map((elem) => (
            <div key={elem._id} className='border border-zinc-800 bg-zinc-900 rounded overflow-hidden'>

              {/* Day header row with checkbox */}
              <div className='flex items-center gap-3 px-6 py-4 border-b border-zinc-800'>
                <span className={`text-sm font-semibold tracking-wide flex-1 ${elem.completed ? 'line-through text-zinc-600' : 'text-white'}`}>
                  <span className='text-yellow-400 mr-2'>Day {elem.day}:</span>
                  {elem.topic}
                </span>
                <input
                  type='checkbox'
                  checked={elem.completed}
                  className='w-4 h-4 accent-yellow-400 cursor-pointer flex-shrink-0'
                />
              </div>

              {/* Subtasks */}
              <div className='px-6 py-3 space-y-2'>
                {elem.subtasks.map((task, index) => (
                  <div key={task._id} className='flex items-start gap-3 py-1'>
                    <span className={`text-xs leading-relaxed flex-1 ${task.completed ? 'line-through text-zinc-600' : 'text-zinc-400'}`}>
                      {task.task}
                    </span>
                    <input
                      type='checkbox'
                      checked={task.completed}
                      onChange={(e)=>{
                        taskCompleted(elem.day-1, index , e.target.checked);
                      }}
                      className='w-3.5 h-3.5 mt-0.5 accent-yellow-400 cursor-pointer flex-shrink-0'
                    />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Roadmap