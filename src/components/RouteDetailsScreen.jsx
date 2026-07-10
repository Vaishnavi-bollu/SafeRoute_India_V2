import GlassCard from './GlassCard'

function RouteDetailsScreen() {
  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Route details</p>
          <h2>Safe corridor</h2>
        </div>
        <div className="avatar-pill">🛣</div>
      </div>

      <GlassCard title="Route 7A" subtitle="Safer alternative to Main Road">
        <div className="timeline">
          <div><strong>01</strong><span>Police checkpoint</span></div>
          <div><strong>02</strong><span>Well-lit underpass</span></div>
          <div><strong>03</strong><span>Open cafeteria</span></div>
        </div>
      </GlassCard>

      <GlassCard title="Safety breakdown" subtitle="Time-based scoring">
        <div className="metric-row">
          <div><strong>8:00 PM</strong><span>92%</span></div>
          <div><strong>9:00 PM</strong><span>87%</span></div>
          <div><strong>10:00 PM</strong><span>79%</span></div>
        </div>
      </GlassCard>
    </section>
  )
}

export default RouteDetailsScreen
