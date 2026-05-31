from datetime import datetime
from fastapi import HTTPException
from app.controllers.store import HOSPITALS
from app.schemas.hospital_schema import HospitalCreate, HospitalUpdate
from app.services.distance.distance_service import haversine_km
from app.services.ranking.hospital_ranking_service import rank_hospital, stamp_hospital


def filter_hospitals(params: dict) -> list[dict]:
    rows = [h.copy() for h in HOSPITALS]
    lat, lng = params.get("latitude"), params.get("longitude")
    if lat is not None and lng is not None:
        for h in rows:
            h["distance_km"] = haversine_km(float(lat), float(lng), h["latitude"], h["longitude"])
    q = (params.get("q") or "").lower()
    city = (params.get("city") or "").lower()
    country = (params.get("country") or "").lower()
    if q:
        rows = [h for h in rows if q in h["name"].lower() or q in h["city"].lower() or q in h["pincode"]]
    if city:
        rows = [h for h in rows if city in h["city"].lower() or city in h["state"].lower() or city in h["country"].lower() or city in h["pincode"]]
    if country:
        rows = [h for h in rows if country in h["country"].lower()]
    for key, field in [("specialty", "specialties"), ("facility", "facilities")]:
        value = (params.get(key) or "").lower()
        if value:
            rows = [h for h in rows if any(value in x.lower() for x in h.get(field, []) + h.get("diagnostics", []))]
    specialties = [s.lower() for s in params.get("specialties", []) if s]
    if specialties:
        rows = [h for h in rows if any(s in x.lower() for s in specialties for x in h.get("specialties", []))]
    facilities = [f.lower() for f in params.get("facilities", []) if f]
    if facilities:
        rows = [h for h in rows if any(f in x.lower() for f in facilities for x in h.get("facilities", []) + h.get("diagnostics", []))]
    if params.get("emergency_available") is not None:
        rows = [h for h in rows if h["emergency_available"] == params["emergency_available"]]
    if params.get("cashless_insurance") is not None:
        rows = [h for h in rows if h["cashless_insurance"] == params["cashless_insurance"]]
    max_consult = params.get("max_consultation_price")
    if max_consult:
        rows = [h for h in rows if h["estimated_prices"]["consultation_min"] <= int(max_consult)]
    max_distance = params.get("max_distance_km")
    if max_distance and lat is not None and lng is not None:
        rows = [h for h in rows if h.get("distance_km", 9999) <= float(max_distance)]
    filters = {
        "facilities": [params.get("facility")] if params.get("facility") else params.get("facilities", []),
        "specialties": [params.get("specialty")] if params.get("specialty") else params.get("specialties", []),
        "emergency_available": params.get("emergency_available"),
        "cashless_insurance": params.get("cashless_insurance"),
        "max_consultation_price": max_consult,
    }
    for h in rows:
        h["ranking_score"], h["ranking_reason"] = rank_hospital(h, filters)
    sort = params.get("sort") or "best"
    if sort == "nearest":
        rows.sort(key=lambda h: h.get("distance_km", 9999))
    elif sort == "lowest_price":
        rows.sort(key=lambda h: h["estimated_prices"]["consultation_min"])
    elif sort == "facility_score":
        rows.sort(key=lambda h: len(h["facilities"]) + len(h["diagnostics"]), reverse=True)
    elif sort == "emergency":
        rows.sort(key=lambda h: (h["emergency_available"], h["ambulance_available"]), reverse=True)
    else:
        rows.sort(key=lambda h: h.get("ranking_score", 0), reverse=True)
    return rows


async def list_hospitals(params: dict):
    return filter_hospitals(params)


async def get_hospital(hospital_id: str):
    hospital = next((h for h in HOSPITALS if h["id"] == hospital_id or h["slug"] == hospital_id), None)
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital


async def create_hospital(payload: HospitalCreate):
    data = payload.model_dump()
    data["id"] = f"hospital-{len(HOSPITALS)+1}"
    data["slug"] = data.get("slug") or data["name"].lower().replace(" ", "-")
    data["created_at"] = datetime.utcnow().isoformat()
    data["updated_at"] = datetime.utcnow().isoformat()
    HOSPITALS.append(stamp_hospital(data))
    return data


async def update_hospital(hospital_id: str, payload: HospitalUpdate):
    hospital = await get_hospital(hospital_id)
    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    hospital.update(updates)
    hospital["updated_at"] = datetime.utcnow().isoformat()
    stamp_hospital(hospital)
    return hospital


async def delete_hospital(hospital_id: str):
    hospital = await get_hospital(hospital_id)
    HOSPITALS.remove(hospital)
    return {"deleted": True, "id": hospital_id}
