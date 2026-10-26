import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api'

function Login({ saveToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  function login() {
    fetch(`${API}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          saveToken(data.token)
          navigate("/submit")
        } else {
          setMessage("Wrong username or password.")
        }
      })
      .catch(() => setMessage("Can't reach the server. Is Django running?"))
  }

  return (
    <div className="panel login-panel">
      <h2>Log in</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Log in</button>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Login