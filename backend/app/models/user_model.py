def user_doc(name: str, email: str, password_hash: str, role: str = "user") -> dict:
    from datetime import datetime
    return {"name": name, "email": email.lower(), "password": password_hash, "role": role, "created_at": datetime.utcnow()}
