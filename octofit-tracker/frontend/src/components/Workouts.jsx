import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${apiBaseUrl}/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(workoutsEndpoint).then(setWorkouts).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Personalized plan</span><h1>Workouts</h1><p>Simple sessions matched to the team’s energy.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="data-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-topline"><span>{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p className="meta">{workout.difficulty}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div>}
    </section>
  )
}

export default Workouts
