import GlassCard from './GlassCard'

const getHeatColor = (value, invert = false) => {
  const pct = Math.max(0, Math.min(100, value))
  const hue = invert ? 120 - (pct * 120) / 100 : (pct * 120) / 100
  return `hsl(${hue}, 72%, 18%)`
}

const getTextColor = (value, invert = false) => {
  const pct = Math.max(0, Math.min(100, value))
  const threshold = invert ? 40 : 55
  return pct > threshold ? '#041008' : '#e4ffe5'
}

function HomeScreen({ onNavigate, onOpenMapRoute, onOpenHeatmap, onOpenSafePlace, onOpenPoliceStation, route }) {
  const crowdStyle = {
    background: getHeatColor(route.crowdDensity, true),
    color: getTextColor(route.crowdDensity, true),
  }
  const lightingStyle = {
    background: getHeatColor(route.lighting),
    color: getTextColor(route.lighting),
  }

  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Live safety score</p>
          <h2>Good evening, Asha</h2>
        </div>
        <div className="avatar-pill">🧭</div>
      </div>

      <GlassCard title="Recommended route to the nearest police station" subtitle="Optimized for safety over speed" className="hero-card">
        <p className="eyebrow">Current position</p>
        <div className="route-chip">{route.currentPosition}</div>
        <div className="route-chip">{route.name}</div>
        <div className="metric-row">
          <div>
            <strong>92%</strong>
            <span>Safe</span>
          </div>
          <div>
            <strong>{route.eta}</strong>
            <span>Realtime ETA</span>
          </div>
          <div>
            <strong>{route.distance}</strong>
            <span>Realtime distance</span>
          </div>
        </div>
        <button type="button" className="primary-btn" onClick={onOpenMapRoute}>
          View route details
        </button>
      </GlassCard>

      <GlassCard title="Nearby police stations" subtitle="Choose the closest station to route to">
        <ul className="bullet-list safe-place-list">
          {route.policeStations?.map((station) => (
            <li key={station.name}>
              <button
                type="button"
                className="safe-place-item"
                onClick={() => onOpenPoliceStation?.(station)}
              >
                <span>{station.name}</span>
                <small>{station.distance}</small>
              </button>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard title="Nearest safe places" subtitle="Along the route to the police station">
        <ul className="bullet-list safe-place-list">
          {route.safePlaces.map((place) => (
            <li key={place.name}>
              <button type="button" className="safe-place-item" onClick={() => onOpenSafePlace(place)}>
                <span>{place.name}</span>
                <small>{place.distance}</small>
              </button>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard title="Crowd & lighting" subtitle="Realtime conditions" className="hero-card">
        <div className="heat-summary">
          <div style={crowdStyle}>
            <strong>{route.crowdDensity}%</strong>
            <span>Crowd density</span>
          </div>
          <div style={lightingStyle}>
            <strong>{route.lighting}%</strong>
            <span>Lighting</span>
          </div>
        </div>
        <div className="heatbar">
          <div className="heatbar__fill" style={{ width: `${route.heatFill}` }} />
        </div>
        <button type="button" className="text-btn" onClick={onOpenHeatmap}>
          {route.heatLabel} heat map
        </button>
      </GlassCard>

      <GlassCard title="Live alerts" subtitle="Updated 2 min ago">
        <ul className="bullet-list">
          <li>Ration market crowd easing near Sector 15</li>
          <li>Two safe checkpoints available along the route</li>
          <li>Emergency shelter 400m ahead</li>
        </ul>
      </GlassCard>
    </section>
  )
}

export default HomeScreen
