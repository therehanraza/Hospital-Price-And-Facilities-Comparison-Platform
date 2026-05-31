from fastapi import APIRouter, Depends
from app.controllers import auth_controller
from app.middleware.auth_middleware import get_current_user
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.response_utils import ok

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/signup")
async def signup(payload: UserCreate):
    return ok(await auth_controller.signup(payload), "Account created")


@router.post("/login")
async def login(payload: UserLogin):
    return ok(await auth_controller.login(payload), "Logged in")


@router.get("/me")
async def me(user: dict = Depends(get_current_user)):
    return ok(auth_controller.public_user(user))
