import GlassCard from './GlassCard'

function NearbySafePlacesScreen() {
  const places = [
    { name: 'City Police Booth', type: 'Secure checkpoint', distance: '180m' },
    { name: '24/7 Café', type: 'Public safe space', distance: '320m' },
    { name: 'Metro Exit Lounge', type: 'Well-lit shelter', distance: '450m' },
  ]

  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Nearby</p>
          <h2>Safe places</h2>
        </div>
        <div className="avatar-pill">🏠</div>
      </div>

      {places.map((place) => (
        <GlassCard key={place.name} title={place.name} subtitle={place.type} className="place-card">
          <div className="place-card__footer">
            <span className="tiny-pill safe">{place.distance}</span>
            <button type="button" className="text-btn">Navigate</button>
          </div>
        </GlassCard>
      ))}
    </section>
  )
}

export default NearbySafePlacesScreen
