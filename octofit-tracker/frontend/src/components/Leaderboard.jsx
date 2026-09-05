import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">September challenge</span><h1>Leaderboard</h1><p>Small habits add up. Here is the current pace.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="leaderboard">{leaders.sort((first, second) => first.rank - second.rank).map((leader) => <article className={`leader-row rank-${leader.rank}`} key={leader._id}><span className="rank">{String(leader.rank).padStart(2, '0')}</span><div><h2>{leader.userId?.name ?? 'OctoFit student'}</h2><p>{leader.streakDays} day streak</p></div><strong>{leader.points} pts</strong></article>)}</div>}
    </section>
  )
}

export default Leaderboard
