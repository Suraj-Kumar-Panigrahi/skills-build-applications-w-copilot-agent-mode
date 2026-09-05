import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${apiBaseUrl}/leaderboard/`

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(leaderboardEndpoint).then(setLeaders).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">September challenge</span><h1>Leaderboard</h1><p>Small habits add up. Here is the current pace.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="leaderboard">{leaders.sort((first, second) => first.rank - second.rank).map((leader) => <article className={`leader-row rank-${leader.rank}`} key={leader._id}><span className="rank">{String(leader.rank).padStart(2, '0')}</span><div><h2>{leader.userId?.name ?? 'OctoFit student'}</h2><p>{leader.streakDays} day streak</p></div><strong>{leader.points} pts</strong></article>)}</div>}
    </section>
  )
}

export default Leaderboard
