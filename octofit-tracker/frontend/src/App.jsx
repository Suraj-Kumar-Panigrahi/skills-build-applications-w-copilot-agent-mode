import { NavLink, Route, Routes } from 'react-router-dom'
import { apiBaseUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Students</NavLink>
        </nav>
        <span className="status-dot">Live</span>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>

      <footer><span>MERGINGTON HIGH SCHOOL</span><span>API · {apiBaseUrl}</span></footer>
    </div>
  )
}

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-intro">
        <span className="eyebrow">Monday · September 7, 2026</span>
        <h1>Move with purpose.</h1>
        <p>One place for the effort, energy, and friendly competition keeping Mergington moving.</p>
        <NavLink className="primary-action" to="/activities">View activity log <span aria-hidden="true">↗</span></NavLink>
      </div>
      <div className="dashboard-orbit" aria-hidden="true"><span>KEEP<br />GOING</span><i /></div>
      <div className="metric-strip">
        <div><strong>03</strong><span>students active</span></div>
        <div><strong>785</strong><span>team points</span></div>
        <div><strong>08</strong><span>day best streak</span></div>
      </div>
      <div className="quick-links">
        <NavLink to="/leaderboard"><span>01</span><strong>See who's leading</strong><b>↗</b></NavLink>
        <NavLink to="/workouts"><span>02</span><strong>Find your next workout</strong><b>↗</b></NavLink>
      </div>
    </section>
  )
}

export default App
