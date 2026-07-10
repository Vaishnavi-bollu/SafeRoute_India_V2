import { useEffect, useMemo, useState } from 'react'
import './App.css'
import BottomNav from './components/BottomNav'
import HeatmapScreen from './components/HeatmapScreen'
import HomeScreen from './components/HomeScreen'
import LiveMapScreen from './components/LiveMapScreen'
import LoginScreen from './components/LoginScreen'
import NearbySafePlacesScreen from './components/NearbySafePlacesScreen'
import RouteDetailsScreen from './components/RouteDetailsScreen'
import SettingsScreen from './components/SettingsScreen'
import SplashScreen from './components/SplashScreen'
import SosScreen from './components/SosScreen'

const HYDERABAD_POLICE_STATIONS = [
  {
    name: 'Panjagutta Police Station',
    address: 'Hyderabad, West Zone, 500082',
    zone: 'West Zone',
    lat: 17.4262,
    lng: 78.4531,
    contact: '09490616377',
    pincode: '500082',
  },
  {
    name: 'Gachibowli Police Station',
    address: 'Cyberabad, Madhapur, 500032',
    zone: 'Madhapur',
    lat: 17.4411,
    lng: 78.3612,
    contact: '09490617126',
    pincode: '500032',
  },
  {
    name: 'Kukatpally Police Station',
    address: 'Cyberabad, Kukatpally, 500072',
    zone: 'Kukatpally',
    lat: 17.4841,
    lng: 78.3979,
    contact: '09490617122',
    pincode: '500072',
  },
  {
    name: 'Marredpally Police Station',
    address: 'Hyderabad, North Zone, 500026',
    zone: 'North Zone',
    lat: 17.4431,
    lng: 78.5015,
    contact: '09490616471',
    pincode: '500026',
  },
  {
    name: 'Abids Police Station',
    address: 'Hyderabad, Central Zone, 500001',
    zone: 'Central Zone',
    lat: 17.3941,
    lng: 78.4735,
    contact: '09490616303',
    pincode: '500001',
  },
  {
    name: 'Chatrinaka Police Station',
    address: 'Hyderabad, South Zone, 500053',
    zone: 'South Zone',
    lat: 17.3484,
    lng: 78.4791,
    contact: '09490616500',
    pincode: '500053',
  },
  {
    name: 'Nallakunta Police Station',
    address: 'Hyderabad, East Zone, 500044',
    zone: 'East Zone',
    lat: 17.3986,
    lng: 78.5061,
    contact: '09490616373',
    pincode: '500044',
  },
  {
    name: 'Alwal Police Station',
    address: 'Malkajgiri, Alwal, 500010',
    zone: 'Alwal',
    lat: 17.5023,
    lng: 78.5019,
    contact: '09490617254',
    pincode: '500010',
  },
  {
    name: 'Warangal Subedari PS',
    address: 'Warangal, Kazipet, 506001',
    zone: 'Kazipet',
    lat: 17.9944,
    lng: 79.5591,
    contact: '09490617600',
    pincode: '506001',
  },
  {
    name: 'Karimnagar Town-I PS',
    address: 'Karimnagar, Karimnagar, 505001',
    zone: 'Karimnagar',
    lat: 18.4385,
    lng: 79.1288,
    contact: '09490617501',
    pincode: '505001',
  },
  {
    name: 'Nizamabad I-Town PS',
    address: 'Nizamabad, Nizamabad, 503001',
    zone: 'Nizamabad',
    lat: 18.6732,
    lng: 78.0984,
    contact: '09490618001',
    pincode: '503001',
  },
  {
    name: 'Khammam Three Town PS',
    address: 'Khammam, Khammam, 507001',
    zone: 'Khammam',
    lat: 17.2471,
    lng: 80.1514,
    contact: '09490618103',
    pincode: '507001',
  },
  {
    name: 'Ramagundam NTR Nagar PS',
    address: 'Ramagundam, Peddapalli, 505208',
    zone: 'Peddapalli',
    lat: 18.7618,
    lng: 79.4752,
    contact: '09490617461',
    pincode: '505208',
  },
  {
    name: 'Mahabubnagar Rural PS',
    address: 'Mahabubnagar, Mahabubnagar, 509001',
    zone: 'Mahabubnagar',
    lat: 16.7481,
    lng: 78.0035,
    contact: '09490618201',
    pincode: '509001',
  },
  {
    name: 'Nalgonda Town-I PS',
    address: 'Nalgonda, Nalgonda, 508001',
    zone: 'Nalgonda',
    lat: 17.0543,
    lng: 79.2625,
    contact: '09490618301',
    pincode: '508001',
  },
  {
    name: 'Adilabad One Town PS',
    address: 'Adilabad, Adilabad, 504001',
    zone: 'Adilabad',
    lat: 19.6641,
    lng: 78.5322,
    contact: '09490618401',
    pincode: '504001',
  },
  {
    name: 'Suryapet Town PS',
    address: 'Suryapet, Suryapet, 508213',
    zone: 'Suryapet',
    lat: 17.1424,
    lng: 79.6241,
    contact: '09490618351',
    pincode: '508213',
  },
  {
    name: 'Kothagudem L&O PS',
    address: 'Bhadradri Kothagudem, Kothagudem, 507101',
    zone: 'Kothagudem',
    lat: 17.5511,
    lng: 80.6148,
    contact: '09490618151',
    pincode: '507101',
  },
  {
    name: 'Siddipet Three Town PS',
    address: 'Siddipet, Siddipet, 502103',
    zone: 'Siddipet',
    lat: 18.1012,
    lng: 78.8524,
    contact: '09490617403',
    pincode: '502103',
  },
  {
    name: 'Sangareddy Town PS',
    address: 'Sangareddy, Sangareddy, 502001',
    zone: 'Sangareddy',
    lat: 17.6121,
    lng: 78.0831,
    contact: '09490613101',
    pincode: '502001',
  },
]

const defaultRoute = {
  name: 'Nearest Police Station',
  currentPosition: 'Finding your location...',
  eta: '—',
  distance: '—',
  crowdDensity: 68,
  lighting: 82,
  heatLabel: 'Moderate',
  heatFill: '68%',
  liveAlerts: [
    'Live route updates will appear here once your current location is available.',
  ],
  heatmapZones: [
    { name: 'Sector 15 Market', crowd: 'High', lighting: 'Medium', className: 'high' },
    { name: 'Safe Shelter', crowd: 'Low', lighting: 'High', className: 'low' },
    { name: 'Police Booth', crowd: 'Medium', lighting: 'High', className: 'med' },
  ],
  safePlaces: [
    { name: 'Local Safety Booth', distance: '650 m', lat: 0, lng: 0 },
    { name: '24/7 Community Shelter', distance: '1.1 km', lat: 0, lng: 0 },
    { name: 'Well-lit Checkpoint', distance: '1.9 km', lat: 0, lng: 0 },
  ],
  policeStations: HYDERABAD_POLICE_STATIONS.map((station) => ({
    name: station.name,
    address: station.address,
    distance: '—',
    lat: station.lat,
    lng: station.lng,
  })),
}

const defaultPoliceStationLocation = { lat: 0, lng: 0 }

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null

const getNearbyPoliceStations = (position) => HYDERABAD_POLICE_STATIONS

const getNearestPoliceStation = (position) => {
  const stations = getNearbyPoliceStations(position)
  return stations.reduce((nearest, station) => {
    const nearestDist = getDistanceKm(position, nearest)
    const stationDist = getDistanceKm(position, station)
    return stationDist < nearestDist ? station : nearest
  }, stations[0])
}

const getNearbySafePlaces = (position) => [
  {
    name: 'Community Safety Shelter',
    distanceLabel: '420 m',
    lat: position.lat + 0.0028,
    lng: position.lng + 0.0015,
  },
  {
    name: 'Well-lit Café',
    distanceLabel: '610 m',
    lat: position.lat - 0.0019,
    lng: position.lng + 0.0022,
  },
  {
    name: 'Metro Exit Lounge',
    distanceLabel: '890 m',
    lat: position.lat + 0.0035,
    lng: position.lng - 0.0012,
  },
]

const toRadians = (value) => (value * Math.PI) / 180

const getDistanceKm = (locA, locB) => {
  const earthRadiusKm = 6371
  const dLat = toRadians(locB.lat - locA.lat)
  const dLon = toRadians(locB.lng - locA.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(locA.lat)) * Math.cos(toRadians(locB.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}

const buildRoute = (position) => {
  const currentPosition = position
    ? `${position.lat.toFixed(3)}, ${position.lng.toFixed(3)}`
    : defaultRoute.currentPosition

  const policeStations = position ? getNearbyPoliceStations(position) : defaultRoute.policeStations
  const policeStationsWithDistance = policeStations
    .map((station) => ({
      ...station,
      distanceKm: position ? getDistanceKm(position, { lat: station.lat, lng: station.lng }) : 0,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .map((station) => ({
      name: station.name,
      address: station.address,
      distance: position ? `${Math.round(station.distanceKm * 1000)} m` : station.distance || '—',
      lat: station.lat,
      lng: station.lng,
      contact: station.contact,
      pincode: station.pincode,
    }))
  const nearestStation = position ? policeStationsWithDistance[0] : defaultPoliceStationLocation
  const stationName = nearestStation?.name ?? defaultRoute.name
  const stationAddress = nearestStation?.address ?? ''
  const policeDist = position ? getDistanceKm(position, { lat: nearestStation.lat, lng: nearestStation.lng }) : 2.8
  const safePlaces = position ? getNearbySafePlaces(position) : defaultRoute.safePlaces
  const safePlacesWithDistance = safePlaces
    .map((place) => ({
      ...place,
      distanceKm: position ? getDistanceKm(position, { lat: place.lat, lng: place.lng }) : 0,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .map((place) => ({
      name: place.name,
      distance: position ? `${Math.round(place.distanceKm * 1000)} m` : place.distance || '—',
      lat: place.lat,
      lng: place.lng,
    }))

  const distance = `${policeDist.toFixed(1)} km`
  const alertDistance = policeDist < 1
    ? `${Math.round(policeDist * 1000)} m`
    : `${Math.round(policeDist)} km`
  const eta = `${Math.max(4, Math.round(policeDist * 4 + 3))} min`
  const crowdDensity = position ? Math.max(30, Math.min(90, 80 - policeDist * 5)) : 68
  const lighting = position ? Math.max(45, Math.min(95, 70 + policeDist * 4)) : 82
  const heatFill = `${Math.min(100, Math.round(crowdDensity))}%`
  const alertSeverity = crowdDensity > 75 ? 'High' : crowdDensity > 50 ? 'Moderate' : 'Low'
  const liveAlerts = position
    ? [
        `${alertSeverity} crowd near ${stationName}`,
        `${lighting}% lighting along the route`,
        `Route to ${stationName} is ${alertDistance}`,
      ]
    : defaultRoute.liveAlerts

  return {
    ...defaultRoute,
    name: stationName,
    currentPosition,
    eta,
    distance,
    crowdDensity: Math.round(crowdDensity),
    lighting: Math.round(lighting),
    heatLabel: crowdDensity > 75 ? 'High' : crowdDensity > 50 ? 'Moderate' : 'Low',
    heatFill,
    safePlaces: safePlacesWithDistance,
    policeStations: policeStationsWithDistance,
    origin: position || null,
    nearestStation,
    stationLocation: nearestStation,
    stationAddress,
    liveAlerts,
  }
}

const loadMapsScript = (key) => new Promise((resolve, reject) => {
  if (!key) return reject(new Error('No API key'))
  const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
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

const fetchNearbyPoliceStationsUsingPlaces = async (position) => {
  try {
    await loadMapsScript(API_KEY)
    const { maps } = window.google
    // create a temporary div for PlacesService
    const div = document.createElement('div')
    const map = new maps.Map(div)
    const service = new maps.places.PlacesService(map)
    return new Promise((resolve) => {
      const request = {
        location: new maps.LatLng(position.lat, position.lng),
        radius: 3000,
        type: 'police',
      }
      service.nearbySearch(request, (results, status) => {
        if (status !== maps.places.PlacesServiceStatus.OK || !results) {
          resolve(null)
          return
        }
        const stations = results.map((p) => ({
          name: p.name,
          address: p.vicinity || p.formatted_address || '',
          lat: p.geometry?.location?.lat(),
          lng: p.geometry?.location?.lng(),
        }))
        resolve(stations)
      })
    })
  } catch (e) {
    return null
  }
}

const buildRouteFromPlaces = (position, places) => {
  if (!position) return buildRoute(null)
  if (!places || places.length === 0) return buildRoute(position)

  const policeStationsWithDistance = places
    .map((station) => ({
      ...station,
      distanceKm: getDistanceKm(position, { lat: station.lat, lng: station.lng }),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .map((station) => ({
      name: station.name,
      address: station.address,
      distance: `${Math.round(station.distanceKm * 1000)} m`,
      lat: station.lat,
      lng: station.lng,
    }))

  const nearestStation = policeStationsWithDistance[0]
  const policeDistKm = getDistanceKm(position, { lat: nearestStation.lat, lng: nearestStation.lng })
  const distance = `${policeDistKm.toFixed(1)} km`
  const alertDistance = policeDistKm < 1 ? `${Math.round(policeDistKm * 1000)} m` : `${Math.round(policeDistKm)} km`
  const eta = `${Math.max(4, Math.round(policeDistKm * 4 + 3))} min`
  const crowdDensity = Math.max(30, Math.min(90, 80 - policeDistKm * 5))
  const lighting = Math.max(45, Math.min(95, 70 + policeDistKm * 4))
  const heatFill = `${Math.min(100, Math.round(crowdDensity))}%`
  const stationName = nearestStation?.name ?? defaultRoute.name

  const liveAlerts = [
    `${crowdDensity > 75 ? 'High' : crowdDensity > 50 ? 'Moderate' : 'Low'} crowd near ${stationName}`,
    `${Math.round(lighting)}% lighting along the route`,
    `Route to ${stationName} is ${alertDistance}`,
  ]

  return {
    ...defaultRoute,
    name: stationName,
    currentPosition: `${position.lat.toFixed(3)}, ${position.lng.toFixed(3)}`,
    eta,
    distance,
    crowdDensity: Math.round(crowdDensity),
    lighting: Math.round(lighting),
    heatLabel: crowdDensity > 75 ? 'High' : crowdDensity > 50 ? 'Moderate' : 'Low',
    heatFill,
    safePlaces: getNearbySafePlaces(position),
    policeStations: policeStationsWithDistance,
    origin: position,
    nearestStation: nearestStation,
    stationLocation: { lat: nearestStation.lat, lng: nearestStation.lng },
    stationAddress: nearestStation.address,
    liveAlerts,
  }
}

function App() {
  const [screen, setScreen] = useState('splash')
  const [activeTab, setActiveTab] = useState('home')
  const [route, setRoute] = useState(defaultRoute)
  const [routeTarget, setRouteTarget] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setRoute(buildRoute(null))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLocation(loc)
        setRoute(buildRoute(loc))
      },
      () => {
        setRoute(buildRoute(null))
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      },
    )
  }, [])

  const currentScreen = useMemo(() => {
    if (screen === 'splash') return <SplashScreen onContinue={() => setScreen('login')} />
    if (screen === 'login') return <LoginScreen onLogin={() => setScreen('home')} />

    switch (activeTab) {
      case 'map':
        return <LiveMapScreen route={route} routeTarget={routeTarget} />
      case 'heatmap':
        return <HeatmapScreen route={route} routeTarget={routeTarget} />
      case 'sos':
        return <SosScreen onTrigger={() => setScreen('home')} />
      case 'settings':
        return <SettingsScreen />
      case 'route-details':
        return <RouteDetailsScreen route={route} routeTarget={routeTarget} />
      case 'nearby':
        return (
          <NearbySafePlacesScreen
            route={route}
            onOpenSafePlace={(place) => {
              setRouteTarget({
                ...route,
                destination: place.name,
                destinationCoords: { lat: place.lat, lng: place.lng },
                destinationDistance: place.distance,
                origin: location || route.origin,
              })
              setActiveTab('map')
            }}
          />
        )
      default:
        return (
          <HomeScreen
            onNavigate={(next) => setActiveTab(next)}
            onOpenMapRoute={() => {
              setRouteTarget({
                ...route,
                destination: route.nearestStation?.name ?? route.name,
                destinationCoords: route.stationLocation || defaultPoliceStationLocation,
                destinationDistance: route.distance,
                destinationAddress: route.stationAddress,
                origin: location || route.origin,
              })
              setActiveTab('map')
            }}
            onOpenHeatmap={() => setActiveTab('heatmap')}
            onOpenSafePlace={(place) => {
              setRouteTarget({
                ...route,
                destination: place.name,
                destinationCoords: { lat: place.lat, lng: place.lng },
                destinationDistance: place.distance,
                origin: location || route.origin,
              })
              setActiveTab('map')
            }}
            onOpenPoliceStation={(station) => {
              setRouteTarget({
                ...route,
                destination: station.name,
                destinationCoords: { lat: station.lat, lng: station.lng },
                destinationDistance: station.distance,
                destinationAddress: station.address,
                origin: location || route.origin,
              })
              setActiveTab('map')
            }}
            route={route}
          />
        )
    }
  }, [activeTab, screen, routeTarget, route, location])

  const handleNav = (next) => {
    setActiveTab(next)
    if (next === 'sos') {
      setScreen('home')
    }
  }

  return (
    <div className="app-shell">
      <main className="phone-frame">
        {currentScreen}
        {screen !== 'splash' && screen !== 'login' && (
          <BottomNav active={activeTab} onNavigate={handleNav} />
        )}
      </main>
    </div>
  )
}

export default App
