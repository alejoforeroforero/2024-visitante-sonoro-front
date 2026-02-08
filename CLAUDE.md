# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

```
/
├── front/          # React frontend (Vite + Zustand)
├── backend/        # Express API server
└── package.json    # Workspaces root
```

## Commands

```bash
# From root (workspaces)
npm run dev          # Start both frontend and backend
npm run dev:front    # Start frontend only
npm run dev:backend  # Start backend only
npm run build        # Build frontend

# From front/
cd front && npm run dev      # Start dev server (Vite with HMR)
cd front && npm run build    # Production build
cd front && npm run fix      # Run ESLint + Prettier fixes

# From backend/
cd backend && npm run dev    # Start backend with watch mode
cd backend && npm run start  # Start backend production
```

## Environment Variables

**Frontend** (`front/.env`):
- `VITE_BASE_URL` - Base URL for the app
- `VITE_BASE_URL_BACKEND` - Backend API base URL (default: http://localhost:3001)
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID

**Backend** (`backend/.env`):
- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Frontend Architecture

**Stack**: React 18 + Vite + Zustand + React Router v6

**Path Alias**: `@/` maps to `./src/` (configured in vite.config.js)

### State Management (Zustand)

Four stores in `front/src/stores/`:
- `useUserStore` - Auth state, user data, favorites
- `useRecordingsStore` - Audio recordings and categories
- `useAuthorsStore` - Author profiles
- `useAudioPlayerStore` - Global audio player state (isPlaying, current track)

### API Layer

`front/src/api/visitante.api.js` - Axios instance with:
- Cookie-based JWT auth (reads `access_token` from cookies)
- Auto-attaches Bearer token to requests
- 5 second timeout

### Auth Flow

- `useAuth` hook checks for `access_token` cookie on mount
- Google OAuth via `@react-oauth/google`
- Protected routes use `<ProtectedRoute>` component checking `useUserStore.isAuthorized`

### Key UI Components

- `Player.jsx` - Global audio player with progress/volume controls
- `AudioVisualizer.jsx` - Audio visualization
- `NavBar.jsx` - Main navigation with dark mode toggle
- `IntroPage` - Splash screen shown before `firstClick` state is true

### Routing

Routes defined in `front/src/Router.jsx`. Main sections:
- `/` - Landing page
- `/catalogo` - Recordings catalog (with `/catalogo/:category` for filtering)
- `/perfiles` - Authors list (with `/perfil/:authorId` for details)
- `/record/:recordId` - Recording details
- `/mapa` - Map view (uses Mapbox)
- `/chat`, `/profile`, `/edit-profile` - Protected routes

## Backend Architecture

**Stack**: Express + Mongoose + JWT

### API Routes

**Auth** (`/auth`):
- `POST /register/` - User registration
- `POST /token/` - Login
- `POST /google-signin/` - Google OAuth
- `POST /logout/` - Logout
- `GET /user/` - Get current user (protected)
- `PUT /user/` - Update user profile (protected)
- `POST /favorites/` - Add favorite (protected)
- `DELETE /favorites/` - Remove favorite (protected)
- `POST /update-profile-picture/` - Upload profile image (protected)

**Recordings** (`/v1`):
- `GET /recordings/` - List all recordings
- `GET /recordings/:id/` - Get recording details
- `GET /category/` - Get recordings by category
- `GET /categories/:id/` - Get category info

**Authors** (`/v1`):
- `GET /authors/` - List all authors
- `GET /authors/:id/` - Get author details

## Deployment (Vercel + Render)

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://visitantesonoro.alejoforero.com |
| Backend | Render | https://two024-visitante-sonoro-front.onrender.com |

**Database**: MongoDB Atlas (project: visitantesonoro2026, cluster: vs)
**DNS**: Vercel DNS (alejoforero.com) — CNAME `visitantesonoro` → `cname.vercel-dns.com`

### Deploy commands

```bash
# Frontend (from front/)
cd front && vercel --prod

# Backend: auto-deploys from GitHub on push to main
# Manual deploy: Render dashboard → Manual Deploy → Deploy latest commit
```

### Environment variables

**Frontend** (Vercel):
- `VITE_BASE_URL_BACKEND` — Render backend URL
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID
- `VITE_MAPBOX_TOKEN` — Mapbox GL token
- VITE_ variables are baked at build time — redeploy after changing them
- Manage: `vercel env ls` / `vercel env add` / `vercel env rm`

**Backend** (Render):
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — JWT signing secret
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `FRONTEND_URL` — Frontend URL for CORS (`https://visitantesonoro.alejoforero.com`)
- `PORT` is set automatically by Render
- Manage: Render dashboard → Environment

### Notes
- MongoDB connection uses `{ family: 4 }` to force IPv4 (Atlas free tier blocks IPv6)
- Render free tier spins down after inactivity — first request may take ~50s
- MongoDB Atlas Network Access allows `0.0.0.0/0` (required for Render)
