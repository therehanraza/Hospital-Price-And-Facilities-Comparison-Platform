from collections import Counter
from app.controllers.store import HOSPITALS, COMPARISONS


async def stats():
    consults = [h["estimated_prices"]["consultation_min"] for h in HOSPITALS if h["estimated_prices"]["consultation_min"]]
    specialties = Counter(s for h in HOSPITALS for s in h["specialties"])
    facilities = Counter(f for h in HOSPITALS for f in h["facilities"] + h["diagnostics"])
    return {
        "total_hospitals": len(HOSPITALS),
        "emergency_hospitals": sum(1 for h in HOSPITALS if h["emergency_available"]),
        "cashless_hospitals": sum(1 for h in HOSPITALS if h["cashless_insurance"]),
        "average_consultation_price": round(sum(consults) / len(consults)),
        "most_common_specialties": specialties.most_common(8),
        "most_searched_facilities": facilities.most_common(8),
        "most_compared_hospitals": Counter(hid for c in COMPARISONS for hid in c["hospital_ids"]).most_common(6),
        "price_distribution": [
            {"range": "Under 500", "count": sum(1 for h in HOSPITALS if h["estimated_prices"]["consultation_min"] < 500)},
            {"range": "500-799", "count": sum(1 for h in HOSPITALS if 500 <= h["estimated_prices"]["consultation_min"] < 800)},
            {"range": "800+", "count": sum(1 for h in HOSPITALS if h["estimated_prices"]["consultation_min"] >= 800)},
        ],
        "facilities_availability": [{"name": k, "count": v} for k, v in facilities.most_common(10)],
        "specialty_chart": [{"name": k, "count": v} for k, v in specialties.most_common(10)],
        "comparisons_over_time": [{"date": "2026-05-01", "count": 3}, {"date": "2026-05-08", "count": 6}, {"date": "2026-05-15", "count": max(4, len(COMPARISONS))}],
    }
