export function StatCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="card p-5">
      <p className="label">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
      {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
    </div>
  );
}
