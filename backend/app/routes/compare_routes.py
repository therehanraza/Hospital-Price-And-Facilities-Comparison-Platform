from fastapi import APIRouter, Depends
from app.controllers import compare_controller
from app.middleware.auth_middleware import get_current_user
from app.schemas.comparison_schema import CompareRequest
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/compare", tags=["Compare"])


@router.post("")
async def compare(payload: CompareRequest, user: dict = Depends(get_current_user)):
    return ok(await compare_controller.compare(payload.model_dump(), user))


@router.get("/history")
async def history(user: dict = Depends(get_current_user)):
    return ok(await compare_controller.history(user))
