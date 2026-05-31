from typing import Optional
from pydantic import BaseModel, Field


class EstimatedPrices(BaseModel):
    consultation_min: int = 0
    consultation_max: int = 0
    general_ward_min: int = 0
    general_ward_max: int = 0
    private_room_min: int = 0
    private_room_max: int = 0
    icu_min: int = 0
    icu_max: int = 0
    mri_min: int = 0
    mri_max: int = 0
    ct_scan_min: int = 0
    ct_scan_max: int = 0
    blood_test_min: int = 0
    blood_test_max: int = 0


class HospitalBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: str = ""
    address: str
    city: str
    state: str = "Delhi NCR"
    country: str = "India"
    pincode: str = ""
    latitude: float
    longitude: float
    phone: str = ""
    website: str = ""
    emergency_available: bool = False
    ambulance_available: bool = False
    cashless_insurance: bool = False
    specialties: list[str] = []
    facilities: list[str] = []
    diagnostics: list[str] = []
    services: list[str] = []
    estimated_prices: EstimatedPrices
    rating: float = 4.0
    review_count: int = 0
    data_confidence_score: int = Field(default=0, ge=0, le=100)
    data_source_note: str = "Demo data for portfolio project. Verify details directly with hospital."
    last_updated: str = ""


class HospitalCreate(HospitalBase):
    pass


class HospitalUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    emergency_available: Optional[bool] = None
    ambulance_available: Optional[bool] = None
    cashless_insurance: Optional[bool] = None
    specialties: Optional[list[str]] = None
    facilities: Optional[list[str]] = None
    diagnostics: Optional[list[str]] = None
    services: Optional[list[str]] = None
    estimated_prices: Optional[EstimatedPrices] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    data_confidence_score: Optional[int] = Field(default=None, ge=0, le=100)
    data_source_note: Optional[str] = None
    last_updated: Optional[str] = None


class HospitalResponse(HospitalBase):
    id: str
    distance_km: Optional[float] = None
    ranking_score: Optional[int] = None
    ranking_reason: Optional[str] = None
    confidence_label: Optional[str] = None
