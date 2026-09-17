export default function MeasurementField({ field, value, onChange }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-medium" style={{ color: "var(--ink)" }}>
          {field.en}
        </label>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {field.fa}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          step="0.25"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder="0.00"
          className="measure-input w-full rounded-md px-2.5 py-1.5 text-sm bg-transparent"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
        />
        <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
          in
        </span>
      </div>
    </div>
  );
}
