import json
from google import genai
from app.config.settings import get_settings

settings = get_settings()


async def generate_json(prompt: str, schema_hint: str) -> tuple[dict | None, str | None]:
    if not settings.gemini_api_key:
        return None, None
    client = genai.Client(api_key=settings.gemini_api_key)
    safe_prompt = (
        "Return only valid JSON. Do not provide diagnosis, treatment, emergency advice, medicine advice, or medical guarantees. "
        "This is hospital discovery and estimated price/facility comparison only.\n"
        f"Expected JSON shape: {schema_hint}\n\n{prompt}"
    )
    for model in [settings.gemini_model, settings.fallback_gemini_model]:
        try:
            response = client.models.generate_content(model=model, contents=safe_prompt)
            text = (response.text or "").strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            return json.loads(text), model
        except Exception:
            continue
    return None, None
