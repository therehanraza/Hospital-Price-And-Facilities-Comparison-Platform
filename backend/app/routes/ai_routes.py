from fastapi import APIRouter
from pydantic import BaseModel, Field
from app.controllers import ai_controller
from app.schemas.ai_schema import SmartSearchRequest
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/ai", tags=["AI"])


class CompareAiRequest(BaseModel):
    hospital_ids: list[str] = Field(min_length=2, max_length=4)


@router.post("/hospital-summary/{hospital_id}")
async def hospital_summary(hospital_id: str):
    return ok(await ai_controller.summarize_hospital(hospital_id))


@router.post("/compare")
async def compare(payload: CompareAiRequest):
    return ok(await ai_controller.summarize_comparison(payload.hospital_ids))


@router.post("/smart-search")
async def smart_search(payload: SmartSearchRequest):
    return ok(await ai_controller.smart_search(payload.model_dump()))
