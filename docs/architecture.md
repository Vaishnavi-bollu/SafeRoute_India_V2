# SafeRoute India Architecture

## 1. System architecture
- Frontend: React + Vite + Tailwind-inspired CSS system for a premium mobile app UI
- Backend: Node.js + Express for API orchestration and auth
- Database: Firebase Firestore and Firebase Auth
- Maps: Google Maps API for route rendering and geolocation
- AI: Gemini/OpenAI for safety scoring and route recommendations
- Hosting: Vercel for the frontend, Render/Render or Railway for the backend

## 2. Folder structure
```text
safe-route-india/
  client/                  # React frontend
    src/
      components/
      pages/
      hooks/
      services/
      utils/
  server/                  # Express backend
    routes/
    controllers/
    services/
    models/
  firebase/                # Firebase config and rules
  docs/
```

## 3. Database schema
### users
- id: string
- name: string
- phone: string
- preferredSafetyMode: string
- emergencyContacts: string[]
- createdAt: timestamp

### routes
- id: string
- origin: GeoPoint
- destination: GeoPoint
- safetyScore: number
- crowdDensity: number
- lightingScore: number
- dangerReports: number
- recommendedAt: timestamp

### incidents
- id: string
- location: GeoPoint
- severity: string
- category: string
- description: string
- reportedAt: timestamp

### safePlaces
- id: string
- name: string
- type: string
- location: GeoPoint
- rating: number
- isOpen: boolean

## 4. API list
- POST /auth/login
- POST /auth/signup
- GET /routes/recommend
- POST /routes/feedback
- GET /incidents/live
- POST /incidents/report
- GET /places/nearby
- POST /sos/trigger
- GET /health

## 5. AI workflow
1. Collect live crowd density, lighting, incident, and route data.
2. Normalize features into a safety scoring model.
3. Send route context to Gemini/OpenAI with a prompt to rank safest options.
4. Return a safety score, explanation, and fallback route.
5. Store the route recommendation and user feedback for future tuning.

## 6. Development roadmap
- Week 1: UI shell, onboarding, and route cards
- Week 2: Maps integration and live incident feed
- Week 3: AI safety scoring and SOS workflow
- Week 4: Firebase auth, deployment, and pitch polish
