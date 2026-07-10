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

const defaultRoute = {
  name: 'Nearest Police Station',
  currentPosition: 'Finding your location...',
  eta: '—',
  distance: '—',
  crowdDensity: 68,
  lighting: 82,
  heatLabel: 'Moderate',
  heatFill: '68%',
  heatmapZones: [
    { name: 'Sector 15 Market', crowd: 'High', lighting: 'Medium', className: 'high' },
    { name: 'Safe Shelter', crowd: 'Low', lighting: 'High', className: 'low' },
    { name: 'Police Booth', crowd: 'Medium', lighting: 'High', className: 'med' },
  ],
  safePlaces: [
    { name: 'Sector 15 Police Help Booth', distance: '650 m', lat: 28.533, lng: 77.212 },
    { name: '24/7 Community Safety Shelter', distance: '1.1 km', lat: 28.528, lng: 77.205 },
    { name: 'Lighting Checkpoint', distance: '1.9 km', lat: 28.535, lng: 77.220 },
  ],
}

const defaultPoliceStationLocation = { lat: 28.529, lng: 77.209 }

const getNearbyPoliceStations = (position) => [
  {
    name: 'Sector 12 Police Station',
    lat: position.lat + 0.0032,
    lng: position.lng - 0.0021,
  },
  {
    name: 'City Central Police Booth',
    lat: position.lat - 0.0027,
    lng: position.lng + 0.0029,
  },
  {
    name: 'Community Police Help Desk',
    lat: position.lat + 0.0019,
    lng: position.lng + 0.0035,
  },
]

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
    ? `Near ${position.lat.toFixed(3)}, ${position.lng.toFixed(3)}`
    : defaultRoute.currentPosition

  const nearestStation = position ? getNearestPoliceStation(position) : defaultPoliceStationLocation
  const policeDist = position ? getDistanceKm(position, nearestStation) : 2.8
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
  const eta = `${Math.max(4, Math.round(policeDist * 4 + 3))} min`
  const crowdDensity = position ? Math.max(30, Math.min(90, 80 - policeDist * 5)) : 68
  const lighting = position ? Math.max(45, Math.min(95, 70 + policeDist * 4)) : 82
  const heatFill = `${Math.min(100, Math.round(crowdDensity))}%`

  return {
    ...defaultRoute,
    currentPosition,
    eta,
    distance,
    crowdDensity,
    lighting,
    heatLabel: crowdDensity > 75 ? 'High' : crowdDensity > 50 ? 'Moderate' : 'Low',
    heatFill,
    safePlaces: safePlacesWithDistance,
    origin: position || null,
    nearestStation,
    stationLocation: nearestStation,
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
