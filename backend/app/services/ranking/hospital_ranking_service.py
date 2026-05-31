from datetime import datetime


def confidence_score(hospital: dict) -> int:
    checks = [
        bool(hospital.get("website")),
        bool(hospital.get("phone")),
        bool(hospital.get("address")),
        hospital.get("latitude") is not None and hospital.get("longitude") is not None,
        bool(hospital.get("specialties")),
        bool(hospital.get("facilities")),
        bool(hospital.get("estimated_prices")),
        bool(hospital.get("last_updated")),
    ]
    return int(sum(checks) / len(checks) * 100)


def confidence_label(score: int) -> str:
    if score >= 80:
        return "High"
    if score >= 50:
        return "Medium"
    return "Low"


def rank_hospital(hospital: dict, filters: dict) -> tuple[int, str]:
    score = 0
    reasons = []
    distance = hospital.get("distance_km")
    if distance is not None:
        score += max(0, 25 - int(distance))
        reasons.append(f"{distance} km from the selected location")
    requested_facilities = {f.lower() for f in filters.get("facilities", [])}
    existing_facilities = {f.lower() for f in hospital.get("facilities", []) + hospital.get("diagnostics", [])}
    facility_matches = requested_facilities & existing_facilities
    score += len(facility_matches) * 12
    if facility_matches:
        reasons.append("matches facilities: " + ", ".join(sorted(facility_matches)))
    requested_specialties = {s.lower() for s in filters.get("specialties", [])}
    existing_specialties = {s.lower() for s in hospital.get("specialties", [])}
    specialty_matches = requested_specialties & existing_specialties
    score += len(specialty_matches) * 14
    if specialty_matches:
        reasons.append("covers specialties: " + ", ".join(sorted(specialty_matches)))
    if filters.get("emergency_available") and hospital.get("emergency_available"):
        score += 12
        reasons.append("supports emergency care")
    if filters.get("cashless_insurance") and hospital.get("cashless_insurance"):
        score += 10
        reasons.append("supports cashless insurance")
    max_price = filters.get("max_consultation_price")
    prices = hospital.get("estimated_prices", {})
    if max_price and prices.get("consultation_min", 10**9) <= max_price:
        score += 10
        reasons.append("consultation estimate fits the budget")
    score += int(hospital.get("data_confidence_score", confidence_score(hospital)) / 10)
    if not reasons:
        reasons.append("ranked from available price, facility, and confidence data")
    return score, f"{hospital.get('name')} ranked here because it " + ", ".join(reasons) + "."


def stamp_hospital(hospital: dict) -> dict:
    hospital["data_confidence_score"] = hospital.get("data_confidence_score") or confidence_score(hospital)
    hospital["confidence_label"] = confidence_label(hospital["data_confidence_score"])
    hospital.setdefault("last_updated", datetime.utcnow().date().isoformat())
    return hospital
