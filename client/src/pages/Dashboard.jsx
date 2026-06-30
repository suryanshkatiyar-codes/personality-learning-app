import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import image from '../assets/user.jpeg'

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [quote, setQuote] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/api/user/dashboard");
        setUser(response.data.user);
        setQuote(response.data.quote);
        setStats(response.data.stats);
        setRoadmaps(response.data.roadmaps);
      } catch (err) {
        console.log('Failed to fetch user details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [])

  const newRoadmap = () => {
    if (user.personalityType) {
      navigate("/generate");
    } else {
      navigate("/quiz");
    }
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide mx-8 mt-5'>
      <p>Loading your journey...</p>
    </div>
  )

  if (!user) return null;

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';
  const isNewUser = !user.personalityType;

  return (
    <div className='min-h-screen w-full max-w-full flex flex-col px-2 py-4 gap-5 overflow-x-hidden md:flex-row md:items-stretch md:px-2 md:py-2 md:gap-10 md:rounded-2xl mt-21.5'>

      {/* Sidebar - hidden on mobile, visible on pc */}
      <aside className='hidden md:flex md:flex-col md:items-center md:justify-between md:w-1/4 md:rounded-2xl md:overflow-hidden bg-[#505081]'>

        {/* Logo / Brand */}
        <div className='flex justify-center items-center h-12 w-full mt-5'>
          <div className='text-2xl font-bold tracking-wider px-4 py-2 bg-[#272757] rounded-2xl'>Personality Learning</div>
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col gap-5 justify-center items-center -mt-25'>
          <div className='flex flex-col h-40 w-30 rounded-2xl overflow-hidden'>
            <div className='h-30 w-30'>
              <img className='w-full h-full object-cover rounded-2xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s" alt="" />
            </div>
            <div className='flex justify-center items-center h-10 w-full px-4 mt-4 capitalize text-sm font-medium text-gray-800 bg-gray-100 rounded-full truncate'>
              {user.username}
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <button className='text-xl font-medium tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer'>
              <span>⬡</span>
              <span>Dashboard</span>
            </button>
            <button className='text-xl font-medium tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer' onClick={() => navigate('/roadmaps')}>
              <span>◈</span>
              <span>Roadmaps</span>
            </button>
            <button className='text-xl font-medium tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer' onClick={() => navigate('/quiz')}>
              <span>◎</span>
              <span>Quiz</span>
            </button>
          </div>
        </nav>

        {/* User Email at the bottom of sidebar */}
        <div className='flex justify-center items-center h-15 w-full'>
          <p className='font-medium tracking-wide'>{user.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex flex-col gap-5 w-full max-w-full overflow-x-hidden rounded-2xl bg-[#505081] px-4 py-4 md:w-3/4 md:px-5 md:py-5'>

        {/* Header - Greeting + Personality Type */}
        <div className='flex justify-between px-2 py-2 items-stretch'>
          <div className='flex gap-2'>
            <p className='font-medium tracking-wide'>{isNewUser ? "Hello" : "Good to see you back"}</p>
            <h1 className='capitalize font-medium tracking-wide'>{user.username}</h1>
          </div>
          <div>
            {user.personalityType ? (
              <span className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>{user.personalityType}</span>
            ) : (
              <span className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>No Type Yet</span>
            )}
          </div>
        </div>

        {/* New User Banner */}
        {isNewUser && (
          <div className='-mt-5 ml-2'>
            <div>
              <p>Welcome to your learning journey!</p>
              <p>Take the personality quiz first so we can generate roadmaps tailored to how you learn best.</p>
            </div>
            <button className='text-sm font-semibold tracking-wide uppercase text-black transition-all duration-300 cursor-pointer bg-yellow-400 hover:bg-yellow-300 px-6 py-2 ease-in-out rounded-2xl active:scale-90 mt-2' onClick={() => navigate('/quiz')}>
              Take Quiz →
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className='grid grid-cols-2 gap-4 md:flex md:gap-10'>
          <StatCard label="Roadmaps Created" value={stats?.numberOfRoadmapsGenerated ?? 0} />
          <StatCard label="Completed" value={stats?.numberOfRoadmapsFinished ?? 0} />
          <StatCard label="Current Streak" value={`${user.currentStreak ?? 0}d`} />
          <StatCard label="Longest Streak" value={`${user.longestStreak ?? 0}d`} />
        </div>

        {/* Motivational Quote */}
        {quote && (
          <div className='rounded px-2 py-4 bg-[#272757]'>
            <p className='text-base font-medium tracking-wide'>{quote}</p>
          </div>
        )}

        {/* Roadmaps Section Header */}
        <div className='flex justify-between rounded px-2 py-2'>
          <p className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl'>Your Roadmaps</p>
          <button className='font-medium tracking-wide hover:scale-105 transition-all duration-300 cursor-pointer' onClick={newRoadmap}>+ New Roadmap</button>
        </div>

        {/* Roadmaps List or Empty State */}
        {roadmaps.length === 0 ? (
          <div>
            <p className='ml-2'>
              {isNewUser ? 'Complete the quiz first, then generate your first roadmap!' : 'No roadmaps yet. Generate your first one!'}
            </p>
          </div>
        ) : (
          <>
            <div className='flex flex-col gap-4 md:flex-row md:flex-wrap'>
              {roadmaps.slice(0, 4).map((r) => {
                const completedDays = r.roadmap?.filter(d => d.completed).length ?? 0;
                const totalDays = r.roadmap?.length ?? 28;
                const progress = Math.round((completedDays / totalDays) * 100);
                const lastAttempt = r.quizHistory?.length > 0
                  ? r.quizHistory[r.quizHistory.length - 1].percentage
                  : null;

                return (
                  <div
                    key={r._id}
                    onClick={() => navigate(`/roadmap/${r._id}`)}
                    className='w-full rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg md:w-63.5 bg-[#272757] border border-[#3a3a7a]'
                  >
                    {/* Card Top */}
                    <div className='flex justify-between items-center px-4 py-3 border-b border-[#3a3a7a]'>
                      <div>
                        <p className='text-lg font-semibold tracking-wide capitalize text-white'>{r.skill}</p>
                        <span className='text-xs uppercase tracking-widest text-yellow-400'>{r.personalityType}</span>
                      </div>
                      {r.completed && (
                        <span className='text-xs font-bold tracking-widest uppercase text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full'>
                          ✓ Done
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className='flex flex-col gap-2 px-4 py-3 border-b border-[#3a3a7a]'>
                      <div className='flex justify-between'>
                        <span className='text-xs uppercase tracking-widest text-zinc-400'>Progress</span>
                        <span className='text-xs text-zinc-400'>{completedDays}/{totalDays} days</span>
                      </div>
                      <div className='h-1.5 rounded-full overflow-hidden bg-[#3a3a7a]'>
                        <div
                          className='h-full rounded-full bg-yellow-400 transition-all duration-500'
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Last Quiz Score */}
                    {lastAttempt !== null && (
                      <div className='flex justify-between px-4 py-3 border-b border-[#3a3a7a]'>
                        <span className='text-xs uppercase tracking-widest text-zinc-400'>Last Quiz</span>
                        <span className='text-xs font-bold text-yellow-400'>{lastAttempt}%</span>
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className='flex justify-between items-center px-4 py-3'>
                      <span className='text-xs uppercase tracking-widest text-zinc-400'>
                        {r.quizHistory?.length ?? 0} attempt{r.quizHistory?.length !== 1 ? 's' : ''}
                      </span>
                      <span className='text-yellow-400 text-sm'>→</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {roadmaps.length > 4 && (
              <button className='text-xl font-medium tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer' onClick={() => navigate('/roadmaps')}>
                View All ({roadmaps.length})
              </button>
            )}
          </>
        )}
      </main>
    </div>
  )
}

const StatCard = ({ label, value }) => (
  <div className='
    w-full rounded-[18px] bg-[#272757] cursor-pointer overflow-hidden
    border border-white/[0.07]
    hover:-translate-y-1 hover:scale-[1.02] hover:border-yellow-400/30
    transition-all duration-250 ease-out
    group
  '>
    <div className='
      flex justify-center items-center px-3 py-3.5
      border-b border-white/[0.07]
      text-[11px] font-semibold tracking-[0.09em] uppercase
      text-[#7070a8] text-center leading-tight
    '>
      {label}
    </div>
    <div className='
      flex justify-center items-center py-5 px-3
      text-[32px] font-bold tracking-tight text-[#f0f0ff]
      relative
      after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
      after:w-7 after:h-0.5 after:rounded-full after:bg-yellow-400
      after:opacity-0 group-hover:after:opacity-100
      after:transition-opacity after:duration-250
    '>
      {value}
    </div>
  </div>
)

export default Dashboard
