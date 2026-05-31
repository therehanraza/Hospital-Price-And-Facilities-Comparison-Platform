from fastapi import APIRouter, Depends
from app.controllers.admin_controller import admin_overview
from app.middleware.auth_middleware import require_admin
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/overview")
async def overview(user: dict = Depends(require_admin)):
    return ok(await admin_overview())
