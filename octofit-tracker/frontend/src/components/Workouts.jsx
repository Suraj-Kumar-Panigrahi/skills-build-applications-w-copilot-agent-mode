import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Personalized plan</span><h1>Workouts</h1><p>Simple sessions matched to the team’s energy.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="data-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-topline"><span>{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p className="meta">{workout.difficulty}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div>}
    </section>
  )
}

export default Workouts
