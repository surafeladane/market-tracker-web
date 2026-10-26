import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { API } from './api'
import Home from './pages/Home'
import Submit from './pages/Submit'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [crops, setCrops] = useState([])
  const [markets, setMarkets] = useState([])
  const [prices, setPrices] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  useEffect(() => {
    loadPrices()

    fetch(`${API}/crops/`)
      .then(response => response.json())
      .then(data => setCrops(data))

    fetch(`${API}/markets/`)
      .then(response => response.json())
      .then(data => setMarkets(data))
  }, [])

  function loadPrices() {
    fetch(`${API}/prices/`)
      .then(response => response.json())
      .then(data => setPrices(data))
  }

  function saveToken(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem("token")
    setToken("")
  }

  return (
    <div className="app">
      <h1>Market Tracker</h1>
      <p className="subtitle">Live crop prices across Ethiopian markets.</p>

      <nav className="nav">
        <NavLink to="/">Prices</NavLink>
        {token === "" ? (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/submit">Submit a price</NavLink>
            <button className="nav-button" onClick={logout}>Log out</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home crops={crops} markets={markets} prices={prices} />} />
        <Route path="/submit" element={<Submit crops={crops} markets={markets} token={token} loadPrices={loadPrices} />} />
        <Route path="/login" element={<Login saveToken={saveToken} />} />
        <Route path="/signup" element={<Signup saveToken={saveToken} />} />
      </Routes>
    </div>
  )
}

export default App