import json
from app.services.ai import mock_provider
from app.services.ai.gemini_provider import generate_json
from app.config.settings import get_settings

settings = get_settings()


async def hospital_summary(hospital: dict) -> dict:
    shape = '{"summary":"","strengths":[],"limitations":[],"bestFor":[],"thingsToConfirm":[]}'
    output, model = await generate_json(f"Summarize this hospital profile: {json.dumps(hospital, default=str)}", shape)
    return {"provider": "gemini" if output else "mock", "model": model or "mock-ai", "output": output or mock_provider.hospital_summary(hospital)}


async def comparison_summary(hospitals: list[dict]) -> dict:
    shape = '{"overallSummary":"","bestForAffordability":"","bestForFacilities":"","bestForEmergency":"","bestForDiagnostics":"","missingDataWarnings":[],"thingsToConfirm":[]}'
    output, model = await generate_json(f"Compare these hospital profiles: {json.dumps(hospitals, default=str)}", shape)
    return {"provider": "gemini" if output else "mock", "model": model or "mock-ai", "output": output or mock_provider.compare_hospitals(hospitals)}


async def smart_search_filters(query: str) -> dict:
    shape = '{"interpretedFilters":{"specialties":[],"facilities":[],"maxConsultationPrice":0,"cashlessInsurance":false,"emergencyAvailable":false,"maxDistanceKm":0},"searchExplanation":""}'
    output, model = await generate_json(f"Convert this hospital search query into filters: {query}", shape)
    return {"provider": "gemini" if output else "mock", "model": model or "mock-ai", "output": output or mock_provider.smart_search(query)}
