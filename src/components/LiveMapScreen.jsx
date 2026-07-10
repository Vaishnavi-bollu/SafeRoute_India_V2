function LiveMapScreen({ routeTarget }) {
  const destination = routeTarget?.destination ?? 'nearest police station'
  const mapQuery = routeTarget
    ? encodeURIComponent(`${routeTarget.currentPosition} to ${destination}`)
    : encodeURIComponent('nearest police station')

  return (
    <section className="screen live-map-screen">
      <div className="screen__header screen__header--overlay">
        <div>
          <p className="eyebrow">Live map</p>
          <h2>{routeTarget ? 'Police station route' : 'Route overlay'}</h2>
        </div>
        <div className="avatar-pill">🗺</div>
      </div>

      <div className="map-fullscreen">
        <iframe
          title="Google Map"
          className="map-iframe"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="map-actions">
          <button type="button" className="map-action map-action--traffic">
            Traffic
            <span>Moderate flow</span>
          </button>
          <button type="button" className="map-action map-action--alert">
            Alert
            <span>High crowd near Sector 15</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default LiveMapScreen
