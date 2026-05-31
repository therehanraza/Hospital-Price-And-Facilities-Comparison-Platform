from fastapi import APIRouter
from app.controllers import store
from app.utils.seed_data import DEMO_USERS, build_hospitals
from app.services.ranking.hospital_ranking_service import stamp_hospital
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/seed", tags=["Seed"])


@router.post("")
async def seed():
    store.USERS[:] = [u.copy() for u in DEMO_USERS]
    store.HOSPITALS[:] = [stamp_hospital(h) for h in build_hospitals()]
    store.SAVED[:] = []
    store.COMPARISONS[:] = []
    return ok({"users": len(store.USERS), "hospitals": len(store.HOSPITALS)}, "Demo data seeded")
