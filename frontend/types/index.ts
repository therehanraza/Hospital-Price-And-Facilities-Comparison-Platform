export type EstimatedPrices = {
  consultation_min: number;
  consultation_max: number;
  general_ward_min: number;
  general_ward_max: number;
  private_room_min: number;
  private_room_max: number;
  icu_min: number;
  icu_max: number;
  mri_min: number;
  mri_max: number;
  ct_scan_min: number;
  ct_scan_max: number;
  blood_test_min: number;
  blood_test_max: number;
};

export type Hospital = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  emergency_available: boolean;
  ambulance_available: boolean;
  cashless_insurance: boolean;
  specialties: string[];
  facilities: string[];
  diagnostics: string[];
  services: string[];
  estimated_prices: EstimatedPrices;
  rating: number;
  review_count: number;
  data_confidence_score: number;
  confidence_label?: string;
  data_source_note: string;
  last_updated: string;
  distance_km?: number;
  ranking_score?: number;
  ranking_reason?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
