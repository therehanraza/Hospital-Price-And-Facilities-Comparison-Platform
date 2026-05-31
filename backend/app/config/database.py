from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import get_settings

settings = get_settings()
client = AsyncIOMotorClient(settings.mongo_uri) if settings.mongo_uri else None
db = client.hospital_price_platform if client else None


async def get_database():
    return db


def using_memory_store() -> bool:
    return db is None
