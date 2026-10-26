import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api'

function Signup({ saveToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  function signup() {
    fetch(`${API}/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(response => {
        if (response.ok) {
          return fetch(`${API}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
          })
            .then(res => res.json())
            .then(data => {
              saveToken(data.token)
              navigate("/submit")
            })
        } else {
          return response.json().then(data => {
            setMessage(Object.values(data).flat().join(" "))
          })
        }
      })
      .catch(() => setMessage("Can't reach the server. Is Django running?"))
  }

  return (
    <div className="panel login-panel">
      <h2>Create an account</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password (8+ characters)" />
      <button onClick={signup}>Sign up</button>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Signup