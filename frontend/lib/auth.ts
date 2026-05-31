"use client";
import type { User } from "@/types";

export function setSession(token: string, user: User) {
  localStorage.setItem("hpf_token", token);
  localStorage.setItem("hpf_user", JSON.stringify(user));
  window.dispatchEvent(new Event("hpf-session"));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("hpf_user");
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem("hpf_token");
  localStorage.removeItem("hpf_user");
  window.dispatchEvent(new Event("hpf-session"));
  window.location.href = "/";
}
