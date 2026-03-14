import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
    <div className='min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center gap-4'>
      {/* <div className='w-2 h-2 rounded-full bg-yellow-400 animate-pulse' /> */}
      <p className='text-zinc-600 text-xs tracking-widest uppercase'>Loading your journey...</p>
    </div>
  )

  if (!user) return null;

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';
  const isNewUser = !user.personalityType;

  return (
    <div className='flex min-h-screen bg-zinc-950 text-white'>

      {/* Sidebar */}
      <aside className='w-56 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col p-6 sticky top-0 gap-8'>
        <div className='text-xl font-bold tracking-widest text-yellow-400'>PL</div>

        <nav className='flex flex-col gap-1 flex-1'>
          <button className='flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800 text-yellow-400 text-sm text-left'>
            <span>⬡</span>
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/roadmaps')}
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 text-sm text-left transition-all duration-150'
          >
            <span>◈</span>
            <span>Roadmaps</span>
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 text-sm text-left transition-all duration-150'
          >
            <span>◎</span>
            <span>Quiz</span>
          </button>
        </nav>

        <div className='flex items-center gap-3 p-3 bg-zinc-800 rounded-xl'>
          <div className='w-9 h-9 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center text-xs font-bold flex-shrink-0'>
            {initials}
          </div>
          <div className='min-w-0'>
            <p className='text-sm font-semibold text-white truncate'>{user.username}</p>
            <p className='text-xs text-zinc-500 truncate'>{user.email}</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className='flex-1 px-12 py-10 overflow-y-auto'>

        {/* Header */}
        <div className='flex justify-between items-start mb-10'>
          <div>
            <p className='text-zinc-500 text-xs tracking-widest uppercase mb-1'>Good to see you back</p>
            <h1 className='text-4xl font-light tracking-tight'>{user.username}</h1>
          </div>
          {user.personalityType ? (
            <span className='bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full'>
              {user.personalityType}
            </span>
          ) : (
            <span className='bg-zinc-800 border border-zinc-700 text-zinc-500 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full'>
              No Type Yet
            </span>
          )}
        </div>

        {/* New User Banner */}
        {isNewUser && (
          <div className='mb-8 border border-yellow-400/30 bg-yellow-400/5 rounded-xl p-6 flex items-center justify-between'>
            <div>
              <p className='text-yellow-400 text-xs tracking-widest uppercase font-bold mb-1'>Welcome to your learning journey!</p>
              <p className='text-zinc-400 text-sm'>Take the personality quiz first so we can generate roadmaps tailored to how you learn best.</p>
            </div>
            <button
              onClick={() => navigate('/quiz')}
              className='bg-yellow-400 text-zinc-950 text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex-shrink-0 ml-6'
            >
              Take Quiz →
            </button>
          </div>
        )}

        {/* Stats */}
        <div className='grid grid-cols-4 gap-4 mb-8'>
          <StatCard label="Roadmaps Created" value={stats?.numberOfRoadmapsGenerated ?? 0} accent="text-yellow-400" bar="bg-yellow-400" />
          <StatCard label="Completed" value={stats?.numberOfRoadmapsFinished ?? 0} accent="text-green-400" bar="bg-green-400" />
          <StatCard label="Current Streak" value={`${user.currentStreak ?? 0}d`} accent="text-orange-400" bar="bg-orange-400" />
          <StatCard label="Longest Streak" value={`${user.longestStreak ?? 0}d`} accent="text-violet-400" bar="bg-violet-400" />
        </div>

        {/* Quote */}
        {quote && (
          <div className='mb-10 bg-zinc-900 border border-zinc-800 border-l-2 border-l-yellow-400 rounded-r-xl px-6 py-5 flex items-start gap-3'>
            <span className='text-3xl text-yellow-400 leading-none -mt-1 flex-shrink-0'>"</span>
            <p className='text-zinc-400 text-sm leading-relaxed italic'>{quote}</p>
          </div>
        )}

        {/* Roadmaps Section */}
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-xs font-medium text-zinc-500 tracking-widest uppercase'>Your Roadmaps</h2>
          <button
            onClick={newRoadmap}
            className='bg-yellow-400 text-zinc-950 text-xs font-bold tracking-wide px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-200'
          >
            + New Roadmap
          </button>
        </div>

        {roadmaps.length === 0 ? (
          <div className='border border-dashed border-zinc-800 rounded-xl p-16 text-center'>
            <p className='text-zinc-600 text-sm'>
              {isNewUser ? 'Complete the quiz first, then generate your first roadmap!' : 'No roadmaps yet. Generate your first one!'}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {roadmaps.map((r) => {
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
                  className='bg-zinc-900 border border-zinc-800 hover:border-yellow-400 rounded-2xl p-5 cursor-pointer transition-colors duration-200 flex flex-col gap-4'
                >
                  {/* Card Top */}
                  <div className='flex justify-between items-start'>
                    <div>
                      <p className='text-base font-semibold capitalize mb-1'>{r.skill}</p>
                      <span className='text-xs text-zinc-600 tracking-widest uppercase'>{r.personalityType}</span>
                    </div>
                    {r.completed && (
                      <span className='bg-green-400/10 border border-green-400/30 text-green-400 text-xs font-bold tracking-wide px-3 py-1 rounded-full flex-shrink-0'>
                        ✓ Done
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <span className='text-xs text-zinc-600 tracking-widest uppercase'>Progress</span>
                      <span className='text-xs text-zinc-500'>{completedDays}/{totalDays} days</span>
                    </div>
                    <div className='h-px bg-zinc-800 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-yellow-400 rounded-full transition-all duration-500'
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Quiz Score */}
                  {lastAttempt !== null && (
                    <div className='flex justify-between items-center bg-zinc-800 rounded-lg px-3 py-2'>
                      <span className='text-xs text-zinc-600 tracking-widest uppercase'>Last Quiz</span>
                      <span className={`text-sm font-bold ${lastAttempt >= 70 ? 'text-green-400' : lastAttempt >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {lastAttempt}%
                      </span>
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className='flex justify-between items-center pt-2 border-t border-zinc-800'>
                    <span className='text-xs text-zinc-700'>
                      {r.quizHistory?.length ?? 0} quiz attempt{r.quizHistory?.length !== 1 ? 's' : ''}
                    </span>
                    <span className='text-zinc-700 text-sm'>→</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

const StatCard = ({ label, value, accent, bar }) => (
  <div className='bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative overflow-hidden'>
    <div className={`absolute top-0 left-0 right-0 h-0.5 ${bar}`} />
    <p className='text-xs text-zinc-600 tracking-widest uppercase mb-2'>{label}</p>
    <p className={`text-4xl font-light tracking-tight ${accent}`}>{value}</p>
  </div>
)

export default Dashboard
