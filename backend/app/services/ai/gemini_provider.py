import json
import warnings
from app.config.settings import get_settings

settings = get_settings()


def create_gemini_client():
    # Import lazily so the free demo can boot cleanly when Gemini is not configured.
    with warnings.catch_warnings():
        try:
            from pydantic.warnings import ArbitraryTypeWarning

            warnings.filterwarnings("ignore", category=ArbitraryTypeWarning)
        except Exception:
            pass

        from google import genai

    return genai.Client(api_key=settings.gemini_api_key)


async def generate_json(prompt: str, schema_hint: str) -> tuple[dict | None, str | None]:
    if not settings.gemini_api_key:
        return None, None
    client = create_gemini_client()
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
