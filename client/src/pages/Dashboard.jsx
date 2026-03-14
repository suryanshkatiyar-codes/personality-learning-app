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

  if (loading) return (
    <div style={styles.loadingScreen}>
      <div style={styles.loadingDot} />
      <p style={styles.loadingText}>Loading your journey...</p>
    </div>
  )

  if (!user) return null;

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div style={styles.page}>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>PL</div>
        <nav style={styles.sidebarNav}>
          <button style={{ ...styles.navItem, ...styles.navItemActive }}>
            <span style={styles.navIcon}>⬡</span>
            <span>Dashboard</span>
          </button>
          <button style={styles.navItem} onClick={() => navigate('/roadmaps')}>
            <span style={styles.navIcon}>◈</span>
            <span>Roadmaps</span>
          </button>
          <button style={styles.navItem} onClick={() => navigate('/quiz')}>
            <span style={styles.navIcon}>◎</span>
            <span>Quiz</span>
          </button>
        </nav>
        <div style={styles.sidebarBottom}>
          <div style={styles.avatarCircle}>{initials}</div>
          <div>
            <p style={styles.sidebarUsername}>{user.username}</p>
            <p style={styles.sidebarEmail}>{user.email}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.headerGreeting}>Good to see you back</p>
            <h1 style={styles.headerName}>{user.username}</h1>
          </div>
          <span style={styles.personalityBadge}>{user.personalityType}</span>
        </div>

        {/* Stats Row */}
        <div style={styles.statsGrid}>
          <StatCard label="Roadmaps Created" value={stats?.numberOfRoadmapsGenerated ?? 0} accent="#facc15" />
          <StatCard label="Completed" value={stats?.numberOfRoadmapsFinished ?? 0} accent="#4ade80" />
          <StatCard label="Current Streak" value={`${user.currentStreak ?? 0}d`} accent="#f97316" />
          <StatCard label="Longest Streak" value={`${user.longestStreak ?? 0}d`} accent="#a78bfa" />
        </div>

        {/* Quote Banner */}
        {quote && (
          <div style={styles.quoteBanner}>
            <span style={styles.quoteAccent}>"</span>
            <p style={styles.quoteText}>{quote}</p>
          </div>
        )}

        {/* Roadmaps Section */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Your Roadmaps</h2>
          <button style={styles.newButton} onClick={() => navigate('/generate')}>
            + New Roadmap
          </button>
        </div>

        {roadmaps.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No roadmaps yet. Generate your first one!</p>
          </div>
        ) : (
          <div style={styles.roadmapGrid}>
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
                  style={styles.roadmapCard}
                  onClick={() => navigate(`/roadmap/${r._id}`)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#facc15'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#27272a'}
                >
                  <div style={styles.cardTop}>
                    <div>
                      <p style={styles.cardSkill}>{r.skill}</p>
                      <span style={styles.cardPersonality}>{r.personalityType}</span>
                    </div>
                    {r.completed && (
                      <span style={styles.completedBadge}>✓ Done</span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div style={styles.progressSection}>
                    <div style={styles.progressLabelRow}>
                      <span style={styles.progressLabel}>Progress</span>
                      <span style={styles.progressValue}>{completedDays}/{totalDays} days</span>
                    </div>
                    <div style={styles.progressTrack}>
                      <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Quiz Score */}
                  {lastAttempt !== null && (
                    <div style={styles.quizRow}>
                      <span style={styles.quizLabel}>Last Quiz</span>
                      <span style={{
                        ...styles.quizScore,
                        color: lastAttempt >= 70 ? '#4ade80' : lastAttempt >= 50 ? '#facc15' : '#f87171'
                      }}>
                        {lastAttempt}%
                      </span>
                    </div>
                  )}

                  <div style={styles.cardFooter}>
                    <span style={styles.cardAttempts}>
                      {r.quizHistory?.length ?? 0} quiz attempt{r.quizHistory?.length !== 1 ? 's' : ''}
                    </span>
                    <span style={styles.cardArrow}>→</span>
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

const StatCard = ({ label, value, accent }) => (
  <div style={styles.statCard}>
    <div style={{ ...styles.statAccentBar, background: accent }} />
    <p style={styles.statLabel}>{label}</p>
    <p style={{ ...styles.statValue, color: accent }}>{value}</p>
  </div>
)

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: '#09090b',
    color: '#fff',
    fontFamily: "'DM Sans', sans-serif",
  },

  // Sidebar
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    background: '#111113',
    borderRight: '1px solid #1f1f23',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.25rem',
    position: 'sticky',
    top: 0,
    gap: '2rem',
  },
  sidebarLogo: {
    fontSize: '1.4rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: '#facc15',
    fontFamily: "'Syne', sans-serif",
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 0.75rem',
    borderRadius: '8px',
    background: 'transparent',
    border: 'none',
    color: '#71717a',
    fontSize: '0.85rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    fontFamily: "'DM Sans', sans-serif",
  },
  navItemActive: {
    background: '#1c1c1f',
    color: '#facc15',
  },
  navIcon: {
    fontSize: '1rem',
  },
  sidebarBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    background: '#1c1c1f',
    borderRadius: '10px',
  },
  avatarCircle: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: '#facc15',
    color: '#09090b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  sidebarUsername: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
  },
  sidebarEmail: {
    fontSize: '0.7rem',
    color: '#52525b',
    margin: 0,
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  // Main
  main: {
    flex: 1,
    padding: '2.5rem 3rem',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2.5rem',
  },
  headerGreeting: {
    fontSize: '0.75rem',
    color: '#52525b',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: '0 0 0.4rem',
  },
  headerName: {
    fontSize: '2.2rem',
    fontWeight: '300',
    margin: 0,
    fontFamily: "'Syne', sans-serif",
    letterSpacing: '-0.02em',
  },
  personalityBadge: {
    background: '#facc1520',
    border: '1px solid #facc1540',
    color: '#facc15',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '0.4rem 0.9rem',
    borderRadius: '100px',
  },

  // Stats
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#111113',
    border: '1px solid #1f1f23',
    borderRadius: '12px',
    padding: '1.25rem',
    position: 'relative',
    overflow: 'hidden',
  },
  statAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    borderRadius: '12px 12px 0 0',
  },
  statLabel: {
    fontSize: '0.72rem',
    color: '#52525b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: '0 0 0.5rem',
  },
  statValue: {
    fontSize: '1.9rem',
    fontWeight: '300',
    margin: 0,
    fontFamily: "'Syne', sans-serif",
    letterSpacing: '-0.03em',
  },

  // Quote
  quoteBanner: {
    background: '#111113',
    border: '1px solid #1f1f23',
    borderLeft: '3px solid #facc15',
    borderRadius: '0 12px 12px 0',
    padding: '1.25rem 1.5rem',
    marginBottom: '2.5rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  quoteAccent: {
    fontSize: '2rem',
    color: '#facc15',
    lineHeight: 1,
    fontFamily: "'Syne', sans-serif",
    flexShrink: 0,
    marginTop: '-4px',
  },
  quoteText: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    lineHeight: '1.6',
    margin: 0,
    fontStyle: 'italic',
  },

  // Roadmaps Section
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#a1a1aa',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    margin: 0,
  },
  newButton: {
    background: '#facc15',
    color: '#09090b',
    border: 'none',
    padding: '0.5rem 1.1rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.02em',
  },
  roadmapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },

  // Roadmap Card
  roadmapCard: {
    background: '#111113',
    border: '1px solid #27272a',
    borderRadius: '14px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardSkill: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 0.35rem',
    textTransform: 'capitalize',
    fontFamily: "'Syne', sans-serif",
  },
  cardPersonality: {
    fontSize: '0.68rem',
    color: '#52525b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  completedBadge: {
    background: '#4ade8020',
    border: '1px solid #4ade8040',
    color: '#4ade80',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    padding: '0.25rem 0.6rem',
    borderRadius: '100px',
    flexShrink: 0,
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  progressLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: '0.7rem',
    color: '#52525b',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  progressValue: {
    fontSize: '0.7rem',
    color: '#71717a',
  },
  progressTrack: {
    height: '3px',
    background: '#27272a',
    borderRadius: '100px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#facc15',
    borderRadius: '100px',
    transition: 'width 0.4s ease',
  },
  quizRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 0.75rem',
    background: '#18181b',
    borderRadius: '8px',
  },
  quizLabel: {
    fontSize: '0.72rem',
    color: '#52525b',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  quizScore: {
    fontSize: '0.85rem',
    fontWeight: '700',
    fontFamily: "'Syne', sans-serif",
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.5rem',
    borderTop: '1px solid #1f1f23',
  },
  cardAttempts: {
    fontSize: '0.7rem',
    color: '#3f3f46',
  },
  cardArrow: {
    color: '#3f3f46',
    fontSize: '0.85rem',
    transition: 'color 0.15s ease',
  },

  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    border: '1px dashed #27272a',
    borderRadius: '14px',
  },
  emptyText: {
    color: '#3f3f46',
    fontSize: '0.9rem',
  },

  // Loading
  loadingScreen: {
    minHeight: '100vh',
    background: '#09090b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  loadingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#facc15',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
  loadingText: {
    color: '#3f3f46',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
}

export default Dashboard
