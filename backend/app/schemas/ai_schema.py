from typing import Optional
from pydantic import BaseModel


class SmartSearchRequest(BaseModel):
    query: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SmartSearchResponse(BaseModel):
    interpretedFilters: dict
    searchExplanation: str
    hospitals: list[dict] = []


class AIInsightResponse(BaseModel):
    type: str
    provider: str
    model: str
    output: dict
