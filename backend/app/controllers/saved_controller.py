from datetime import datetime
from app.controllers.store import SAVED
from app.controllers.hospital_controller import get_hospital


async def list_saved(user: dict):
    rows = []
    for item in SAVED:
        if item["user_id"] == user["id"]:
            rows.append({**item, "hospital": await get_hospital(item["hospital_id"])})
    return rows


async def save_hospital(hospital_id: str, note: str, user: dict):
    await get_hospital(hospital_id)
    existing = next((s for s in SAVED if s["user_id"] == user["id"] and s["hospital_id"] == hospital_id), None)
    if existing:
        existing["note"] = note
        return existing
    item = {"id": f"saved-{len(SAVED)+1}", "user_id": user["id"], "hospital_id": hospital_id, "note": note, "created_at": datetime.utcnow().isoformat()}
    SAVED.append(item)
    return item


async def remove_saved(hospital_id: str, user: dict):
    global SAVED
    before = len(SAVED)
    SAVED[:] = [s for s in SAVED if not (s["user_id"] == user["id"] and s["hospital_id"] == hospital_id)]
    return {"deleted": len(SAVED) < before}
