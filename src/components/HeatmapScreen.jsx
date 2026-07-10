import GlassCard from './GlassCard'

function HeatmapScreen({ route }) {
  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Heatmap</p>
          <h2>Safety zones</h2>
        </div>
        <div className="avatar-pill">🔥</div>
      </div>

      <GlassCard title="Crowd density" subtitle="Real-time intensity" className="map-card">
        <div className="heatmap-grid">
          {route.heatmapZones.map((zone) => (
            <article key={zone.name} className={`heat-cell ${zone.className}`}>
              <strong>{zone.name}</strong>
              <span>{zone.crowd} crowd</span>
            </article>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Lighting zones" subtitle="Illuminated paths">
        <div className="legend">
          <span><i className="legend__dot safe" />Well lit</span>
          <span><i className="legend__dot warn" />Medium</span>
          <span><i className="legend__dot danger" />Poorly lit</span>
        </div>
      </GlassCard>
    </section>
  )
}

export default HeatmapScreen
