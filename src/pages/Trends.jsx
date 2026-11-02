import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

function Trends({ crops, markets, prices }) {
  const [cropId, setCropId] = useState("")
  const [marketId, setMarketId] = useState("")

  const chartData = prices
    .filter(p => p.crop === Number(cropId) && p.market === Number(marketId))
    .slice()
    .reverse()
    .map(p => ({
      date: new Date(p.date_submitted).toLocaleDateString(),
      price: Number(p.price)
    }))

  return (
    <div className="panel">
      <h2>Price Trends</h2>

      <div className="filters">
        <select value={cropId} onChange={(e) => setCropId(e.target.value)}>
          <option value="">Select a crop</option>
          {crops.map(crop => (
            <option key={crop.id} value={crop.id}>{crop.name}</option>
          ))}
        </select>

        <select value={marketId} onChange={(e) => setMarketId(e.target.value)}>
          <option value="">Select a market</option>
          {markets.map(market => (
            <option key={market.id} value={market.id}>{market.name}</option>
          ))}
        </select>
      </div>

      {cropId === "" || marketId === "" ? (
        <p>Pick a crop and a market to see its price over time.</p>
      ) : chartData.length < 2 ? (
        <p>Not enough prices yet. A trend needs at least two entries for this crop and market.</p>
      ) : (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e3dac9" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#C9A24B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default Trends