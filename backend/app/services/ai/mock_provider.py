from statistics import mean


def hospital_summary(hospital: dict) -> dict:
    prices = hospital.get("estimated_prices", {})
    strengths = []
    if hospital.get("emergency_available"):
        strengths.append("Emergency support is marked available.")
    if hospital.get("cashless_insurance"):
        strengths.append("Cashless insurance support is included in the demo profile.")
    if "ICU" in hospital.get("facilities", []):
        strengths.append("ICU availability improves facility coverage.")
    if hospital.get("diagnostics"):
        strengths.append("Diagnostics include " + ", ".join(hospital["diagnostics"][:3]) + ".")
    limitations = []
    if not hospital.get("website"):
        limitations.append("Official website link is missing.")
    if not hospital.get("emergency_available"):
        limitations.append("Emergency availability is not marked for this hospital.")
    if not prices.get("mri_min"):
        limitations.append("MRI pricing is not available in the demo dataset.")
    return {
        "summary": f"{hospital['name']} is listed as a {', '.join(hospital.get('specialties', [])[:3])} hospital in {hospital.get('city')}. Consultation estimates start around Rs {prices.get('consultation_min', 0)} and go up to Rs {prices.get('consultation_max', 0)}.",
        "strengths": strengths or ["The profile includes basic location, specialty and price information."],
        "limitations": limitations or ["No major missing fields are visible in the demo profile."],
        "bestFor": hospital.get("specialties", [])[:3] + hospital.get("diagnostics", [])[:1],
        "thingsToConfirm": ["Final consultation and room charges", "Insurance network status", "Doctor availability and current emergency capacity"],
    }


def compare_hospitals(hospitals: list[dict]) -> dict:
    cheapest = min(hospitals, key=lambda h: h.get("estimated_prices", {}).get("consultation_min", 999999))
    most_facilities = max(hospitals, key=lambda h: len(h.get("facilities", [])) + len(h.get("diagnostics", [])))
    emergency = next((h for h in hospitals if h.get("emergency_available") and h.get("ambulance_available")), hospitals[0])
    diagnostics = max(hospitals, key=lambda h: len(h.get("diagnostics", [])))
    missing = []
    for h in hospitals:
        if not h.get("website"):
            missing.append(f"{h['name']} has no website link in the current profile.")
        if not h.get("estimated_prices", {}).get("mri_min"):
            missing.append(f"{h['name']} does not list MRI pricing.")
    avg_consult = int(mean([h.get("estimated_prices", {}).get("consultation_min", 0) for h in hospitals]))
    return {
        "overallSummary": f"The selected hospitals cover different needs. Consultation estimates begin around Rs {avg_consult} on average, with facility coverage strongest at {most_facilities['name']}.",
        "bestForAffordability": cheapest["name"],
        "bestForFacilities": most_facilities["name"],
        "bestForEmergency": emergency["name"] if emergency.get("emergency_available") else "No selected hospital clearly stands out for emergency support.",
        "bestForDiagnostics": diagnostics["name"],
        "missingDataWarnings": missing[:5] or ["No major missing data warnings in the selected demo profiles."],
        "thingsToConfirm": ["Current prices", "Cashless insurer network", "Doctor/specialist schedule", "Emergency bed availability"],
    }


def smart_search(query: str) -> dict:
    q = query.lower()
    specialties = [s for s in ["cardiology", "neurology", "orthopedics", "pediatrics", "gynecology", "oncology", "dermatology", "general medicine"] if s in q]
    facilities = []
    for key, label in [("icu", "ICU"), ("mri", "MRI"), ("ct", "CT Scan"), ("blood", "Blood Bank"), ("pharmacy", "Pharmacy"), ("ambulance", "Ambulance")]:
        if key in q:
            facilities.append(label)
    max_price = None
    for token in q.replace(".", " ").replace(",", " ").split():
        if token.isdigit() and int(token) > 100:
            max_price = int(token)
            break
    return {
        "interpretedFilters": {
            "specialties": specialties,
            "facilities": facilities,
            "maxConsultationPrice": max_price,
            "cashlessInsurance": "cashless" in q or "insurance" in q,
            "emergencyAvailable": "emergency" in q,
            "maxDistanceKm": 10 if "near" in q or "nearby" in q else None,
        },
        "searchExplanation": "The query was converted into practical filters for specialties, facilities, insurance support, price and distance. Results are still discovery data, not medical advice.",
    }
