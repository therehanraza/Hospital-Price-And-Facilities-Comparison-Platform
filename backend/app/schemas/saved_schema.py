from pydantic import BaseModel


class SavedHospitalCreate(BaseModel):
    note: str = ""
