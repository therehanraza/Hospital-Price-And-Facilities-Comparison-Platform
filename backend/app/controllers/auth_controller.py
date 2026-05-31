from fastapi import HTTPException
from app.controllers.store import USERS
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.auth_utils import create_access_token, hash_password, verify_password


def public_user(user: dict) -> dict:
    return {"id": user["id"], "name": user["name"], "email": user["email"], "role": user["role"]}


async def signup(payload: UserCreate):
    if any(u["email"] == payload.email.lower() for u in USERS):
        raise HTTPException(status_code=409, detail="Email already registered")
    user = {"id": f"user-{len(USERS)+1}", "name": payload.name, "email": payload.email.lower(), "password": hash_password(payload.password), "role": payload.role if payload.role in ["user", "admin"] else "user"}
    USERS.append(user)
    return {"access_token": create_access_token(user["email"], user["role"]), "token_type": "bearer", "user": public_user(user)}


async def login(payload: UserLogin):
    user = next((u for u in USERS if u["email"] == payload.email.lower()), None)
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": create_access_token(user["email"], user["role"]), "token_type": "bearer", "user": public_user(user)}
