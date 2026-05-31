from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import get_settings
from app.middleware.error_handler import app_error_handler
from app.routes import auth_routes, hospital_routes, compare_routes, ai_routes, saved_routes, dashboard_routes, admin_routes, seed_routes

settings = get_settings()

app = FastAPI(
    title="AI-Powered Hospital Price & Facilities Comparison Platform",
    version="1.0.0",
    description="Hospital discovery, estimated price transparency, facilities comparison, and structured AI summaries.",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    settings.client_url,
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(Exception, app_error_handler)

app.include_router(auth_routes.router)
app.include_router(hospital_routes.router)
app.include_router(compare_routes.router)
app.include_router(ai_routes.router)
app.include_router(saved_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(admin_routes.router)
app.include_router(seed_routes.router)


@app.get("/")
async def root():
    return {"success": True, "message": "Hospital comparison API is running", "docs": "/docs"}
