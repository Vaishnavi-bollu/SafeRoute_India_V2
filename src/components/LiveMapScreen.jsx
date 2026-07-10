import { useEffect, useRef } from 'react'

function LiveMapScreen({ route, routeTarget }) {
  const mapRef = useRef(null)
  const activeTarget = routeTarget || (route?.nearestStation
    ? {
        origin: route.origin,
        destinationCoords: route.nearestStation,
        destination: route.nearestStation.name,
        destinationDistance: route.distance,
      }
    : null)

  const originCoord = activeTarget?.origin ?? null
  const destCoord = activeTarget?.destinationCoords ?? null
  const destinationLabel = activeTarget?.destination ?? 'Nearest police station'
  // Prefer Maps JavaScript API when a Vite env API key is provided
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null

  let mapIframeUrl = ''
  if (API_KEY && originCoord && destCoord) {
    // Use Maps Embed API for directions when API key is available (allowed in iframe)
    mapIframeUrl = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${originCoord.lat},${originCoord.lng}&destination=${destCoord.lat},${destCoord.lng}&mode=driving`
  } else if (destCoord) {
    // Fallback to a simple place/embed query (some Google URLs block embedding)
    mapIframeUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${destCoord.lat},${destCoord.lng}`)}&output=embed`
  } else {
    mapIframeUrl = `https://www.google.com/maps?q=${encodeURIComponent(destinationLabel)}&output=embed`
  }

  const trafficLabel = route.crowdDensity > 75 ? 'Heavy traffic' : route.crowdDensity > 50 ? 'Moderate traffic' : 'Light traffic'
  const trafficDetail = route.crowdDensity > 75
    ? 'Avoid this route if possible'
    : route.crowdDensity > 50
      ? 'Use with caution'
      : 'Good to go'
  const alertLabel = route.lighting < 55 ? 'Low visibility' : 'Normal visibility'
  const alertStation = activeTarget?.destination ?? route.nearestStation?.name ?? 'your route'
  const alertDetail = `${alertLabel} near ${alertStation}`


  useEffect(() => {
    let directionsRenderer = null
    let map = null

    const loadScript = (src) => new Promise((resolve, reject) => {
      if (window.google && window.google.maps) return resolve()
      const existing = document.querySelector(`script[src="${src}"]`)
      if (existing) {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', () => reject())
        return
      }
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.defer = true
      s.onload = () => resolve()
      s.onerror = () => reject()
      document.head.appendChild(s)
    })

    const initMap = async () => {
      if (!API_KEY || !originCoord || !destCoord) return
      try {
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`)
        const { maps } = window.google
        map = new maps.Map(mapRef.current, {
          center: { lat: originCoord.lat, lng: originCoord.lng },
          zoom: 14,
        })

        // Traffic layer
        const trafficLayer = new maps.TrafficLayer()
        trafficLayer.setMap(map)

        // Directions
        const directionsService = new maps.DirectionsService()
        directionsRenderer = new maps.DirectionsRenderer({ suppressMarkers: false })
        directionsRenderer.setMap(map)

        directionsService.route(
          {
            origin: { lat: originCoord.lat, lng: originCoord.lng },
            destination: { lat: destCoord.lat, lng: destCoord.lng },
            travelMode: maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === maps.DirectionsStatus.OK || status === 'OK') {
              directionsRenderer.setDirections(result)
              // Fit to bounds
              const bounds = new maps.LatLngBounds()
              result.routes[0].legs.forEach((leg) => {
                bounds.extend(leg.start_location)
                bounds.extend(leg.end_location)
              })
              map.fitBounds(bounds)
            }
          },
        )
      } catch (e) {
        // fallback to iframe (no-op here)
      }
    }

    initMap()

    return () => {
      if (directionsRenderer) {
        try { directionsRenderer.setMap(null) } catch (e) {}
      }
    }
  }, [API_KEY, originCoord, destCoord])

  return (
    <section className="screen live-map-screen">
      <div className="map-fullscreen">
        {/* If API key available and both coords exist, render JS map, else iframe fallback */}
        {API_KEY && originCoord && destCoord ? (
          <div ref={mapRef} className="map-div" style={{ width: '100%', height: '100%' }} />
        ) : (
          <iframe
            title="Google Map"
            className="map-iframe"
            src={mapIframeUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

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
