import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Movement log</span><h1>Activities</h1><p>Recent efforts, captured in one place.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-icon">{activity.type?.slice(0, 1).toUpperCase()}</div><div className="activity-copy"><h2>{activity.type}</h2><p>{activity.durationMinutes} minutes{activity.distanceMiles ? ` · ${activity.distanceMiles} miles` : ''}</p></div><strong>+{activity.points}</strong></article>)}</div>}
    </section>
  )
}

export default Activities
