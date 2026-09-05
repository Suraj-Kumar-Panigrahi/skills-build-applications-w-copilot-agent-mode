import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h1>Students</h1><p>Keep an eye on the people powering the challenge.</p></div>
      {error ? <p className="error-message">{error}</p> : <div className="data-grid">{users.map((user) => <article className="data-card" key={user._id}><div className="avatar">{user.name?.slice(0, 1)}</div><div><h2>{user.name}</h2><p>{user.email}</p><span className="meta">Grade {user.grade} · {user.points} points</span></div></article>)}</div>}
    </section>
  )
}

export default Users
