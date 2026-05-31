from datetime import datetime
from app.controllers.store import COMPARISONS
from app.controllers.hospital_controller import get_hospital
from app.services.ai.ai_service import comparison_summary


async def compare(payload: dict, user: dict | None = None):
    hospitals = [await get_hospital(hid) for hid in payload["hospital_ids"]]
    ai = await comparison_summary(hospitals)
    COMPARISONS.append({"user_id": user.get("id") if user else "anonymous", "hospital_ids": payload["hospital_ids"], "filters_used": payload.get("filters_used", {}), "ai_summary": ai["output"], "created_at": datetime.utcnow().isoformat()})
    return {"hospitals": hospitals, "ai_summary": ai["output"], "provider": ai["provider"], "model": ai["model"]}


async def history(user: dict):
    return [c for c in COMPARISONS if c["user_id"] == user["id"]]
