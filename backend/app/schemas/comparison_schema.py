from pydantic import BaseModel, Field


class CompareRequest(BaseModel):
    hospital_ids: list[str] = Field(min_length=2, max_length=4)
    filters_used: dict = {}


class CompareResponse(BaseModel):
    hospitals: list[dict]
    ai_summary: dict
