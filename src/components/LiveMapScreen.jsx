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
    : ''
  const destinationLabel = activeTarget?.destination ?? 'Nearest police station'
  const destinationAddress = activeTarget?.destinationAddress ?? ''
  const destinationDistance = activeTarget?.destinationDistance ?? ''
  const destination = activeTarget?.destinationCoords
    ? `${activeTarget.destinationCoords.lat},${activeTarget.destinationCoords.lng}`
    : destinationLabel
  const mapUrl = activeTarget && origin
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`
    : `https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`

  const trafficLabel = route.crowdDensity > 75 ? 'Heavy traffic' : route.crowdDensity > 50 ? 'Moderate traffic' : 'Light traffic'
  const trafficDetail = route.crowdDensity > 75
    ? 'Avoid this route if possible'
    : route.crowdDensity > 50
      ? 'Use with caution'
      : 'Good to go'
  const alertLabel = route.lighting < 55 ? 'Low visibility' : 'Normal visibility'
  const alertStation = activeTarget?.destination ?? route.nearestStation?.name ?? 'your route'
  const alertDetail = `${alertLabel} near ${alertStation}`

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
            Traffic view
            <span>{trafficLabel}</span>
            <small>{trafficDetail}</small>
          </button>
          <button type="button" className="map-action map-action--alert">
            Nearby details
            <span>{alertLabel}</span>
            <small>{alertDetail}</small>
          </button>
        </div>
      </div>
    </section>
  )
}

export default LiveMapScreen
