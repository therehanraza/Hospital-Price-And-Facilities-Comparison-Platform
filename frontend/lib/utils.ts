export function inr(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

export function confidenceTone(score: number) {
  if (score >= 80) return "text-green-700 bg-green-50 border-green-200";
  if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

export const disclaimer = "This platform is for hospital discovery and comparison only. It does not provide medical diagnosis, treatment recommendations, emergency advice, or medical guarantees. Prices and facilities are estimated/demo data and may vary. Always verify details directly with the hospital.";
