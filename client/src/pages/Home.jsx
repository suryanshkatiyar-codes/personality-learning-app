import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return navigate('/dashboard');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#f0f0f0',
      fontFamily: "'Georgia', serif",
      overflowX: 'hidden'
    }}>

      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 2rem',
        position: 'relative',
        borderBottom: '1px solid #222'
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }} />

        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#eab308',
          marginBottom: '2rem'
        }}>
          AI — Powered Learning
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight: '400',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          maxWidth: '800px',
          letterSpacing: '-0.02em'
        }}>
          Learn the way your <em style={{ color: '#eab308', fontStyle: 'italic' }}>mind</em> works
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#888',
          maxWidth: '500px',
          lineHeight: '1.8',
          marginBottom: '3rem'
        }}>
          Take a short personality quiz, discover your learning style,
          and get an AI-generated roadmap tailored just for you.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#eab308',
              color: '#0a0a0a',
              border: 'none',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#ca8a04'}
            onMouseLeave={e => e.target.style.backgroundColor = '#eab308'}
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: 'transparent',
              color: '#f0f0f0',
              border: '1px solid #333',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.target.style.borderColor = '#eab308'}
            onMouseLeave={e => e.target.style.borderColor = '#333'}
          >
            Login
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        padding: '8rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#eab308',
          marginBottom: '1rem'
        }}>The Process</p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '400',
          marginBottom: '5rem',
          letterSpacing: '-0.02em'
        }}>How it works</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem'
        }}>
          {[
            { step: '01', title: 'Take the Quiz', desc: 'Answer 10 simple questions about how you like to learn' },
            { step: '02', title: 'Get Your Type', desc: 'We figure out if you are a Visual, Reader, Kinesthetic or Social learner' },
            { step: '03', title: 'Generate Roadmap', desc: 'Pick a skill and get an AI roadmap tailored to how you learn best' },
          ].map((item) => (
            <div key={item.step}>
              <p style={{
                fontSize: '3rem',
                color: '#222',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'monospace'
              }}>{item.step}</p>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '400',
                marginBottom: '0.75rem',
                color: '#eab308'
              }}>{item.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personality Types */}
      <div style={{
        padding: '8rem 2rem',
        borderTop: '1px solid #111',
        borderBottom: '1px solid #111',
        backgroundColor: '#0d0d0d'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#eab308',
            marginBottom: '1rem'
          }}>Personalities</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '400',
            marginBottom: '5rem',
            letterSpacing: '-0.02em'
          }}>4 Learning Styles</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2px',
          }}>
            {[
              { icon: '👁️', type: 'Visual', desc: 'Videos, diagrams and visual content' },
              { icon: '📚', type: 'Reader', desc: 'Documentation, articles and books' },
              { icon: '🛠️', type: 'Kinesthetic', desc: 'Hands-on projects and building things' },
              { icon: '🤝', type: 'Social', desc: 'Community, pair programming and mentorship' },
            ].map((item) => (
              <div key={item.type} style={{
                padding: '2.5rem',
                backgroundColor: '#0a0a0a',
                transition: 'background 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a0a0a'}
              >
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</p>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '400',
                  color: '#f0f0f0',
                  marginBottom: '0.5rem'
                }}>{item.type}</h3>
                <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '10rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: '400',
          marginBottom: '2rem',
          letterSpacing: '-0.02em'
        }}>
          Ready to find your <em style={{ color: '#eab308', fontStyle: 'italic' }}>learning style?</em>
        </h2>
        <button
          onClick={() => navigate('/register')}
          style={{
            backgroundColor: '#eab308',
            color: '#0a0a0a',
            border: 'none',
            padding: '1.2rem 3rem',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: '700',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#ca8a04'}
          onMouseLeave={e => e.target.style.backgroundColor = '#eab308'}
        >
          Start For Free
        </button>
      </div>

    </div>
  )
}

export default Home