import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../api'

function Submit({ crops, markets, token, loadPrices }) {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedMarket, setSelectedMarket] = useState("")
  const [price, setPrice] = useState("")
  const [condition, setCondition] = useState("")
  const [message, setMessage] = useState("")

  if (token === "") {
    return (
      <div className="panel">
        <h2>Log in first</h2>
        <p>You need an account to submit prices. <Link to="/login">Log in</Link> or <Link to="/signup">create an account</Link>.</p>
      </div>
    )
  }

  function submitPrice() {
    fetch(`${API}/prices/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      },
      body: JSON.stringify({
        crop: selectedCrop,
        market: selectedMarket,
        price: price,
        condition: condition
      })
    })
      .then(response => {
        if (response.ok) {
          setMessage("Price saved.")
          setPrice("")
          setCondition("")
          loadPrices()
        } else {
          setMessage("Could not save. Check every field and make sure you are logged in.")
        }
      })
      .catch(() => setMessage("Can't reach the server. Is Django running?"))
  }

  return (
    <div className="form-panel">
      <h2>Submit a Price</h2>
      <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
        <option value="">Select a crop</option>
        {crops.map(crop => (
          <option key={crop.id} value={crop.id}>{crop.name}</option>
        ))}
      </select>

      <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)}>
        <option value="">Select a market</option>
        {markets.map(market => (
          <option key={market.id} value={market.id}>{market.name}</option>
        ))}
      </select>

      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Condition (e.g. Grade A)" />

      <button onClick={submitPrice}>Submit Price</button>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Submit