import { AlertTriangle } from "lucide-react";
import { disclaimer } from "@/lib/utils";

export function Disclaimer() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 shrink-0" size={18} />
        <p>{disclaimer}</p>
      </div>
    </div>
  );
}
