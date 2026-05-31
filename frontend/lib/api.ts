import axios from "axios";
import type { ApiResponse, Hospital, User } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("hpf_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchHospitals(params: Record<string, unknown> = {}) {
  const res = await api.get<ApiResponse<Hospital[]>>("/api/hospitals", { params });
  return res.data.data;
}

export async function fetchHospital(id: string) {
  const res = await api.get<ApiResponse<Hospital>>(`/api/hospitals/${id}`);
  return res.data.data;
}

export async function login(email: string, password: string) {
  const res = await api.post<ApiResponse<{ access_token: string; user: User }>>("/api/auth/login", { email, password });
  return res.data.data;
}

export async function signup(name: string, email: string, password: string) {
  const res = await api.post<ApiResponse<{ access_token: string; user: User }>>("/api/auth/signup", { name, email, password });
  return res.data.data;
}
