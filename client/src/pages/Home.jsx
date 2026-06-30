import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return navigate('/dashboard');

  return (
    <div className='min-h-screen bg-[#0f0f2e] text-[#f0f0ff] overflow-x-hidden'>

      {/* ── Hero ── */}
      <div className='relative min-h-screen flex flex-col justify-center items-center text-center px-6 border-b border-[#1a1a4a]'>

        {/* Background glow */}
        <div className='absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-[radial-gradient(circle,rgba(250,204,21,0.07)_0%,transparent_70%)]' />

        <p className='text-xs tracking-[0.3em] uppercase text-yellow-400 mb-8'>
          AI — Powered Learning
        </p>

        <h1 className='text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.1] mb-6 max-w-3xl tracking-tight'>
          Learn the way your <em className='text-yellow-400 not-italic font-medium'>mind</em> works
        </h1>

        <p className='text-lg text-[#7070a8] max-w-lg leading-relaxed mb-12'>
          Take a short personality quiz, discover your learning style,
          and get an AI-generated roadmap tailored just for you.
        </p>

        <div className='flex flex-wrap gap-4 justify-center'>
          <button
            onClick={() => navigate('/register')}
            className='bg-yellow-400 text-[#0f0f2e] px-10 py-4 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className='bg-transparent text-[#f0f0ff] px-10 py-4 rounded-2xl text-sm tracking-[0.1em] uppercase border border-[#3a3a7a] hover:border-yellow-400/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'
          >
            Login
          </button>
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className='px-6 py-32 max-w-5xl mx-auto'>
        <p className='text-xs tracking-[0.3em] uppercase text-yellow-400 mb-4'>The Process</p>
        <h2 className='text-[clamp(2rem,4vw,3.5rem)] font-light mb-20 tracking-tight'>How it works</h2>

        <div className='grid grid-cols-1 gap-16 md:grid-cols-3'>
          {[
            { step: '01', title: 'Take the Quiz', desc: 'Answer 10 simple questions about how you like to learn' },
            { step: '02', title: 'Get Your Type', desc: 'We figure out if you are a Visual, Reader, Kinesthetic or Social learner' },
            { step: '03', title: 'Generate Roadmap', desc: 'Pick a skill and get an AI roadmap tailored to how you learn best' },
          ].map((item) => (
            <div key={item.step} className='rounded-2xl overflow-hidden bg-[#272757] border border-[#3a3a7a]'>
              <div className='px-6 py-4 border-b border-[#3a3a7a]'>
                <p className='font-mono text-4xl font-bold text-[#3a3a7a]'>{item.step}</p>
              </div>
              <div className='px-6 py-5'>
                <h3 className='text-base font-bold tracking-wider text-yellow-400 mb-2'>{item.title}</h3>
                <p className='text-[13px] text-[#7070a8] leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Personality Types ── */}
      <div className='py-32 px-6 border-t border-[#1a1a4a] border-b bg-[#0d0d2e]'>
        <div className='max-w-5xl mx-auto'>
          <p className='text-xs tracking-[0.3em] uppercase text-yellow-400 mb-4'>Personalities</p>
          <h2 className='text-[clamp(2rem,4vw,3.5rem)] font-light mb-20 tracking-tight'>4 Learning Styles</h2>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {[
              { icon: '👁️', type: 'Visual', desc: 'Videos, diagrams and visual content' },
              { icon: '📚', type: 'Reader', desc: 'Documentation, articles and books' },
              { icon: '🛠️', type: 'Kinesthetic', desc: 'Hands-on projects and building things' },
              { icon: '🤝', type: 'Social', desc: 'Community, pair programming and mentorship' },
            ].map((item) => (
              <div
                key={item.type}
                className='rounded-2xl overflow-hidden bg-[#272757] border border-[#3a3a7a] hover:border-yellow-400/30 hover:scale-[1.02] transition-all duration-300 group'
              >
                <div className='px-5 py-4 border-b border-[#3a3a7a]'>
                  <p className='text-3xl'>{item.icon}</p>
                </div>
                <div className='px-5 py-4'>
                  <h3 className='text-sm font-bold tracking-wider text-[#f0f0ff] mb-2 group-hover:text-yellow-400 transition-colors duration-300'>{item.type}</h3>
                  <p className='text-[12px] text-[#7070a8] leading-relaxed'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className='py-40 px-6 text-center'>
        <h2 className='text-[clamp(2rem,5vw,4rem)] font-light mb-10 tracking-tight'>
          Ready to find your <em className='text-yellow-400 not-italic font-medium'>learning style?</em>
        </h2>
        <button
          onClick={() => navigate('/register')}
          className='bg-yellow-400 text-[#0f0f2e] px-12 py-5 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'
        >
          Start For Free
        </button>
      </div>

    </div>
  )
}

export default Home
