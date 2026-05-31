from datetime import datetime

AUDIT_LOGS: list[dict] = []


def log_action(user_id: str, action: str, message: str):
    AUDIT_LOGS.append({"user_id": user_id, "action": action, "message": message, "created_at": datetime.utcnow().isoformat()})
