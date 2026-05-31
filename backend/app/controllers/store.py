from datetime import datetime
from app.utils.seed_data import DEMO_USERS, build_hospitals
from app.services.ranking.hospital_ranking_service import stamp_hospital

USERS = [u.copy() for u in DEMO_USERS]
HOSPITALS = [stamp_hospital(h) for h in build_hospitals()]
SAVED = []
COMPARISONS = []
AI_INSIGHTS = []


def serialize(doc: dict) -> dict:
    clean = doc.copy()
    if "_id" in clean:
        clean["id"] = str(clean.pop("_id"))
    for key, value in list(clean.items()):
        if isinstance(value, datetime):
            clean[key] = value.isoformat()
    return clean
