function LiveMapScreen({ routeTarget }) {
  const origin = routeTarget?.origin
    ? `${routeTarget.origin.lat},${routeTarget.origin.lng}`
    : 'My Location'
  const destination = routeTarget?.destinationCoords
    ? `${routeTarget.destinationCoords.lat},${routeTarget.destinationCoords.lng}`
    : routeTarget?.destination ?? 'nearest police station'
  const destinationLabel = routeTarget?.destination ?? 'Nearest police station'
  const destinationDistance = routeTarget?.destinationDistance ?? ''
  const mapQuery = routeTarget
    ? `${origin} to ${destination}`
    : 'nearest police station'
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

  return (
    <section className="screen live-map-screen">
      <div className="screen__header screen__header--overlay">
        <div>
          <p className="eyebrow">Live map</p>
          <h2>{routeTarget ? `${destinationLabel} route` : 'Route overlay'}</h2>
          {routeTarget && (
            <p className="small-copy">
              {destinationLabel} {destinationDistance ? `· ${destinationDistance}` : ''}
            </p>
          )}
        </div>
        <div className="avatar-pill">🗺</div>
      </div>

      <div className="map-fullscreen">
        <iframe
          title="Google Map"
          className="map-iframe"
          src={mapUrl}
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
