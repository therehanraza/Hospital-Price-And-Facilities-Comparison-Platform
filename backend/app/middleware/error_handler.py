from fastapi import Request
from fastapi.responses import JSONResponse


async def app_error_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"success": False, "message": "Unexpected server error", "detail": str(exc)})
