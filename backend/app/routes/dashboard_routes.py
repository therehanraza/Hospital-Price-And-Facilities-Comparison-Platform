from fastapi import APIRouter
from app.controllers.dashboard_controller import stats
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats")
async def dashboard_stats():
    return ok(await stats())
