from app.controllers.hospital_controller import get_hospital, filter_hospitals
from app.services.ai.ai_service import hospital_summary, comparison_summary, smart_search_filters


async def summarize_hospital(hospital_id: str):
    hospital = await get_hospital(hospital_id)
    return await hospital_summary(hospital)


async def summarize_comparison(hospital_ids: list[str]):
    hospitals = [await get_hospital(hid) for hid in hospital_ids]
    return await comparison_summary(hospitals)


async def smart_search(payload: dict):
    ai = await smart_search_filters(payload["query"])
    filters = ai["output"]["interpretedFilters"]
    params = {
        "latitude": payload.get("latitude"),
        "longitude": payload.get("longitude"),
        "specialties": filters.get("specialties", []),
        "facilities": filters.get("facilities", []),
        "max_consultation_price": filters.get("maxConsultationPrice"),
        "cashless_insurance": filters.get("cashlessInsurance") or None,
        "emergency_available": filters.get("emergencyAvailable") or None,
        "max_distance_km": filters.get("maxDistanceKm"),
        "sort": "best",
    }
    hospitals = filter_hospitals(params)[:8]
    return {**ai["output"], "hospitals": hospitals, "provider": ai["provider"], "model": ai["model"]}
