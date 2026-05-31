from typing import Optional
from fastapi import APIRouter, Depends
from app.controllers import hospital_controller
from app.middleware.auth_middleware import require_admin
from app.schemas.hospital_schema import HospitalCreate, HospitalUpdate
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/hospitals", tags=["Hospitals"])


@router.get("")
async def list_hospitals(q: str = "", city: str = "", country: str = "", specialty: str = "", facility: str = "", emergency_available: Optional[bool] = None, cashless_insurance: Optional[bool] = None, max_consultation_price: Optional[int] = None, max_distance_km: Optional[float] = None, latitude: Optional[float] = None, longitude: Optional[float] = None, sort: str = "best"):
    return ok(await hospital_controller.list_hospitals(locals()))


@router.post("")
async def create_hospital(payload: HospitalCreate, user: dict = Depends(require_admin)):
    return ok(await hospital_controller.create_hospital(payload), "Hospital created")


@router.get("/{hospital_id}")
async def get_hospital(hospital_id: str):
    return ok(await hospital_controller.get_hospital(hospital_id))


@router.patch("/{hospital_id}")
async def update_hospital(hospital_id: str, payload: HospitalUpdate, user: dict = Depends(require_admin)):
    return ok(await hospital_controller.update_hospital(hospital_id, payload), "Hospital updated")


@router.delete("/{hospital_id}")
async def delete_hospital(hospital_id: str, user: dict = Depends(require_admin)):
    return ok(await hospital_controller.delete_hospital(hospital_id), "Hospital deleted")
