import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${apiBaseUrl}/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(teamsEndpoint).then(setTeams).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Friendly competition</span><h1>Teams</h1><p>See how each crew is moving together.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="data-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-swatch" style={{ backgroundColor: team.color }} /><div><h2>{team.name}</h2><p>Coached by {team.coach}</p><span className="meta">{team.memberIds?.length ?? 0} members · {team.totalPoints} points</span></div></article>)}</div>}
    </section>
  )
}

export default Teams
