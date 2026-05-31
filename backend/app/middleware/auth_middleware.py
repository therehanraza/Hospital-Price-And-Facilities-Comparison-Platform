from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.utils.auth_utils import decode_token
from app.controllers.store import USERS

security = HTTPBearer(auto_error=False)


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication required")
    try:
        payload = decode_token(credentials.credentials)
        user = next((u for u in USERS if u["email"] == payload["sub"]), None)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc


async def require_admin(user: dict = Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user
