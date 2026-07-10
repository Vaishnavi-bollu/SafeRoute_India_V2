function LiveMapScreen({ route, routeTarget }) {
  const activeTarget = routeTarget || (route?.nearestStation
    ? {
        origin: route.origin,
        destinationCoords: route.nearestStation,
        destination: route.nearestStation.name,
        destinationDistance: route.distance,
      }
    : null)

  const origin = activeTarget?.origin
    ? `${activeTarget.origin.lat},${activeTarget.origin.lng}`
    : 'My Location'
  const destination = activeTarget?.destinationCoords
    ? `${activeTarget.destinationCoords.lat},${activeTarget.destinationCoords.lng}`
    : activeTarget?.destination ?? 'nearest police station'
  const destinationLabel = activeTarget?.destination ?? 'Nearest police station'
  const destinationDistance = activeTarget?.destinationDistance ?? ''
  const mapQuery = activeTarget
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
