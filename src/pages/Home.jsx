import { useState } from 'react'

function Home({ crops, markets, prices }) {
  const [filterCrop, setFilterCrop] = useState("")
  const [filterMarket, setFilterMarket] = useState("")

  function cropName(id) {
    const crop = crops.find(c => c.id === id)
    return crop ? crop.name : "Unknown"
  }

  function marketName(id) {
    const market = markets.find(m => m.id === id)
    return market ? market.name : "Unknown"
  }

  const filteredPrices = prices.filter(p => {
    const cropMatch = filterCrop === "" || p.crop === Number(filterCrop)
    const marketMatch = filterMarket === "" || p.market === Number(filterMarket)
    return cropMatch && marketMatch
  })

  return (
    <div>
      <div className="columns">
        <div className="panel">
          <h2>Crops</h2>
          <ul>
            {crops.map(crop => (
              <li key={crop.id}>{crop.name} {crop.variety && `(${crop.variety})`}</li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Markets</h2>
          <ul>
            {markets.map(market => (
              <li key={market.id}>{market.name} - {market.region}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel prices-panel">
        <h2>Latest Prices</h2>

        <div className="filters">
          <select value={filterCrop} onChange={(e) => setFilterCrop(e.target.value)}>
            <option value="">All crops</option>
            {crops.map(crop => (
              <option key={crop.id} value={crop.id}>{crop.name}</option>
            ))}
          </select>

          <select value={filterMarket} onChange={(e) => setFilterMarket(e.target.value)}>
            <option value="">All markets</option>
            {markets.map(market => (
              <option key={market.id} value={market.id}>{market.name}</option>
            ))}
          </select>
        </div>

        {filteredPrices.length === 0 ? (
          <p>No prices match this filter yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Market</th>
                <th>Price (ETB)</th>
                <th>Condition</th>
                <th>Date</th>
                <th>Submitted by</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices.map(p => (
                <tr key={p.id}>
                  <td>{cropName(p.crop)}</td>
                  <td>{marketName(p.market)}</td>
                  <td>{p.price}</td>
                  <td>{p.condition}</td>
                  <td>{new Date(p.date_submitted).toLocaleDateString()}</td>
                  <td>{p.submitted_by_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Home