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
  const destinationLabel = activeTarget?.destination ?? 'Nearest police station'
  const destinationAddress = activeTarget?.destinationAddress ?? ''
  const destinationDistance = activeTarget?.destinationDistance ?? ''
  const destination = activeTarget?.destinationCoords
    ? `${destinationLabel} near ${activeTarget.destinationCoords.lat.toFixed(4)},${activeTarget.destinationCoords.lng.toFixed(4)}`
    : destinationLabel
  const mapQuery = activeTarget
    ? `${origin} to ${destination}`
    : 'nearest police station'
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

  return (
    <section className="screen live-map-screen">
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
