from functools import lru_cache
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseModel):
    port: int = int(os.getenv("PORT", "8000"))
    mongo_uri: str = os.getenv("MONGO_URI", "")
    jwt_secret: str = os.getenv("JWT_SECRET", "dev_secret_change_me")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")
    fallback_gemini_model: str = os.getenv("FALLBACK_GEMINI_MODEL", "gemini-2.5-flash-lite")
    environment: str = os.getenv("ENVIRONMENT", "development")
    client_url: str = os.getenv("CLIENT_URL", "http://localhost:3000")


@lru_cache
def get_settings() -> Settings:
    return Settings()
