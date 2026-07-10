import GlassCard from './GlassCard'

function RouteDetailsScreen({ route, routeTarget }) {
  const destination = routeTarget?.destination ?? route.name
  const destinationDistance = routeTarget?.destinationDistance ?? route.distance
  const originLabel = route.currentPosition
  const steps = routeTarget?.destinationCoords
    ? [
        { step: '01', title: 'Start from current location', subtitle: originLabel },
        { step: '02', title: `Head toward ${destination}`, subtitle: `About ${destinationDistance}` },
        { step: '03', title: 'Arrive at destination', subtitle: destination },
      ]
    : [
        { step: '01', title: 'Start from current location', subtitle: originLabel },
        { step: '02', title: 'Follow the main safety corridor', subtitle: 'Use well-lit streets' },
        { step: '03', title: 'Reach nearest police station', subtitle: destination },
      ]

  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Route details</p>
          <h2>{destination}</h2>
          <p className="small-copy">{route.eta} · {route.distance}</p>
        </div>
        <div className="avatar-pill">🛣</div>
      </div>

      <GlassCard title="Guided route" subtitle="Current navigation plan">
        <div className="timeline">
          {steps.map((item) => (
            <div key={item.step}>
              <strong>{item.step}</strong>
              <span>{item.title}</span>
              <small>{item.subtitle}</small>
            </div>
          ))}
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
