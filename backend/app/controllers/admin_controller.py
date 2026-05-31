from app.controllers.store import USERS, HOSPITALS


async def admin_overview():
    return {"users": len(USERS), "hospitals": len(HOSPITALS), "message": "Admin CRUD is available through hospital endpoints."}
