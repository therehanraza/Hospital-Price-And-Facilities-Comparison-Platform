# AI-Powered Hospital Price & Facilities Comparison Platform

A fresher-friendly but serious full-stack healthtech portfolio project for nearby hospital discovery, estimated price transparency and facilities comparison.

## Problem Statement

Hospital information is scattered across maps, hospital websites, phone calls and insurance lists. A user often cannot quickly answer: which nearby hospital has ICU, MRI, emergency support, cashless insurance and a consultation price within my budget?

## Solution

This platform helps users search nearby hospitals, compare estimated prices, facilities, specialties, emergency availability, insurance/cashless support, distance and official website links. Gemini AI adds structured hospital summaries, comparison explanations and smart search filters, while Mock AI keeps the demo functional without paid services.

## Features

- Landing page with practical product positioning
- JWT login/signup with demo admin and user credentials
- Hospital listing with name, city/pincode, facility, specialty, emergency, cashless, price and distance filters
- Three discovery modes: near me, search a city, and worldwide manual selection
- Browser geolocation with city/pincode fallback
- Leaflet + OpenStreetMap hospital map
- Hospital profile pages with facilities, diagnostics, room prices, website and AI summary
- Compare 2 to 4 local or worldwide hospitals side by side
- AI comparison summary for affordability, facilities, emergency, diagnostics and missing data
- Smart search that converts natural language into filters
- Saved hospitals with notes
- Admin CRUD for hospital data
- Dashboard analytics with Recharts
- Data confidence scoring and safety disclaimers

## Tech Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS, Axios, Recharts, Lucide React, Leaflet, React Leaflet.

Backend: Python, FastAPI, MongoDB Atlas, Motor/PyMongo-ready structure, Pydantic, JWT authentication, passlib bcrypt, python-jose, python-dotenv, Uvicorn, CORS middleware.

AI: Google Gemini API using `google-genai`, main model `gemini-3-flash-preview`, fallback model `gemini-2.5-flash-lite`, and Mock AI fallback.

Deployment: Vercel Hobby, Render free Python web service, MongoDB Atlas M0, OpenStreetMap, GitHub.

## AI Architecture

The backend AI service first checks for `GEMINI_API_KEY`. If present, it calls Gemini with safe prompting and requires structured JSON output. If the Gemini 3 model fails, it retries `gemini-2.5-flash-lite`. If the key is missing, unavailable or rate-limited, the service automatically uses Mock AI. The UI never exposes the Gemini key.

AI is used for hospital summaries, comparison summaries and smart search filters. It does not provide diagnosis, treatment recommendations, medicine advice or emergency advice.

## Backend Architecture

FastAPI routes are grouped by domain: auth, hospitals, compare, AI, saved, dashboard, admin and seed. Controllers keep request logic separate from services. Services handle AI fallback, distance calculation, ranking and audit logging. Schemas provide Pydantic validation.

The demo runs with seeded in-memory data so recruiters can start it quickly. The structure is ready to connect MongoDB Atlas M0 through `MONGO_URI`.

## Location and Map Architecture

The frontend uses browser geolocation. If the user allows location access, latitude and longitude are sent to the backend, which calculates hospital distance with the Haversine formula. If permission is denied, users can search by city, region, country or pincode. The hospital listing page has three clear modes: near me, search a city, and worldwide manual selection. Maps use Leaflet with OpenStreetMap tiles, avoiding paid Google Maps APIs.

## Hospital Ranking Explanation

Hospitals are ranked using distance, facility match, specialty match, emergency availability, cashless insurance support, price affordability and data confidence score. Each hospital includes a short ranking reason so the result is explainable.

## Data Confidence Explanation

The data confidence score ranges from 0 to 100. It checks whether the profile includes website, phone, address, coordinates, specialties, facilities, estimated prices and last updated date.

- 80-100: High
- 50-79: Medium
- Below 50: Low

## Folder Structure

```text
hospital-price-facilities-comparison-platform/
  frontend/
    app/
    components/
    lib/
    types/
  backend/
    app/
      config/
      controllers/
      middleware/
      models/
      routes/
      schemas/
      services/
      utils/
    requirements.txt
    render.yaml
  README.md
```

## Local Setup

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Frontend:

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Demo Credentials

- Admin: `admin@example.com` / `password123`
- User: `user@example.com` / `password123`

## MongoDB Atlas Setup

Create a MongoDB Atlas M0 free cluster, add a database user, allow your Render IP or temporary development IP, copy the connection string and set it as `MONGO_URI` in `backend/.env` and Render environment variables.

## Gemini API Setup

Create a free Gemini API key in Google AI Studio and set:

```env
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-3-flash-preview
FALLBACK_GEMINI_MODEL=gemini-2.5-flash-lite
```

The app remains functional without this key because Mock AI is automatic.

## Free Deployment Plan

- Frontend: Vercel Hobby free tier
- Backend: Render free Python web service
- Database: MongoDB Atlas M0 free cluster
- AI: Gemini API free tier with Mock AI fallback
- Maps: Leaflet + OpenStreetMap
- Code hosting: GitHub free

## Vercel Frontend Deployment

Set the Vercel project root to `frontend`. Add:

```env
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com
```

Deploy on the Hobby free tier.

## Render FastAPI Backend Deployment

Set the service root to `backend`, use the included `render.yaml`, and start with:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Add environment variables from `backend/.env.example`. Set `CLIENT_URL` to your Vercel URL for CORS.

## Environment Variables

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Backend:

```env
PORT=8000
MONGO_URI=
JWT_SECRET=your_jwt_secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3-flash-preview
FALLBACK_GEMINI_MODEL=gemini-2.5-flash-lite
ENVIRONMENT=development
CLIENT_URL=http://localhost:3000
```

## Screenshots

Add screenshots here after running locally:

- Landing page
- Hospital listing with map
- Hospital detail page
- Comparison page
- Dashboard
- Admin CRUD

## Resume Bullet Point

Built an AI-powered hospital price and facilities comparison platform that helps users discover nearby hospitals, compare estimated prices, facilities, specialties, emergency support, and official website links using Next.js, TypeScript, Python FastAPI, MongoDB, Gemini API, and OpenStreetMap.

## Interview Explanation

My project helps users compare nearby hospitals based on facilities, estimated prices, specialties, emergency availability, cashless insurance support, and official website links. The system uses location-based search, hospital ranking logic, data confidence scoring, and Gemini AI to generate comparison summaries and smart search filters. The frontend is built with Next.js and TypeScript, while the backend is built using Python FastAPI with MongoDB.

## Safety Disclaimer

This platform is for hospital discovery and comparison only. It does not provide medical diagnosis, treatment recommendations, emergency advice, or medical guarantees. Prices and facilities are estimated/demo data and may vary. Always verify details directly with the hospital.
