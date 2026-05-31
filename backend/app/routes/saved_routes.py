from fastapi import APIRouter, Depends
from app.controllers import saved_controller
from app.middleware.auth_middleware import get_current_user
from app.schemas.saved_schema import SavedHospitalCreate
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/saved", tags=["Saved"])


@router.get("")
async def saved(user: dict = Depends(get_current_user)):
    return ok(await saved_controller.list_saved(user))


@router.post("/{hospital_id}")
async def save(hospital_id: str, payload: SavedHospitalCreate = SavedHospitalCreate(), user: dict = Depends(get_current_user)):
    return ok(await saved_controller.save_hospital(hospital_id, payload.note, user), "Hospital saved")


@router.delete("/{hospital_id}")
async def remove(hospital_id: str, user: dict = Depends(get_current_user)):
    return ok(await saved_controller.remove_saved(hospital_id, user), "Saved hospital removed")
