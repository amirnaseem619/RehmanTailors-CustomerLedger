import { COLLAR_OPTIONS } from "../data/collarOptions.js";
import { MEASURE_FIELDS } from "../data/measurementFields.js";
import SwatchGroup from "./SwatchGroup.jsx";
import MeasurementField from "./MeasurementField.jsx";

export default function CustomerForm({ customer, onChange, onSave, onClear, isEditingExisting, isSaving }) {
  const setField = (key, val) => onChange({ ...customer, [key]: val });
  const setMeasurement = (key, val) =>
    onChange({ ...customer, measurements: { ...customer.measurements, [key]: val } });

  return (
    <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-display text-xl" style={{ color: "var(--ink)" }}>
            {isEditingExisting ? "Customer Record" : "New Customer"}
          </h2>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Record No. {customer.id}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted)" }}>
            Client Name
          </label>
          <input
            value={customer.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="e.g. Ahmad Tariq Walid"
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "transparent" }}
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted)" }}>
            Phone / Mobile
          </label>
          <input
            value={customer.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="+93 7X XXX XXXX"
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "transparent" }}
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted)" }}>
            Order / Fitting Date
          </label>
          <input
            type="date"
            value={customer.orderDate}
            onChange={(e) => setField("orderDate", e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "transparent" }}
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted)" }}>
            Fee (AFN)
          </label>
          <input
            type="number"
            value={customer.fee}
            onChange={(e) => setField("fee", e.target.value)}
            placeholder="0"
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "transparent" }}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted)" }}>
            Notes
          </label>
          <input
            value={customer.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Optional — fabric, delivery notes, etc."
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "transparent" }}
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>
        Measurements (inches)
      </h3>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-2.5 mb-6">
        {MEASURE_FIELDS.map((f) => (
          <MeasurementField key={f.key} field={f} value={customer.measurements[f.key]} onChange={setMeasurement} />
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>
        Collar Style
      </h3>
      <div className="mb-6">
        <SwatchGroup
          label="Collar"
          faLabel="یخن"
          options={COLLAR_OPTIONS}
          value={customer.collar}
          onChange={(v) => setField("collar", v)}
          multi
        />
      </div>

      <div className="flex flex-wrap gap-3 no-print">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="rounded-lg px-5 py-2.5 text-sm font-medium flex items-center gap-2"
          style={{
            background: "var(--navy)",
            color: "#F2ECDD",
            opacity: isSaving ? 0.85 : 1,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving && (
            <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F2ECDD" strokeWidth="3">
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3"></circle>
              <path d="M21 12a9 9 0 0 0-9-9"></path>
            </svg>
          )}
          {isSaving ? "Saving..." : "Save Customer"}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-lg px-5 py-2.5 text-sm font-medium"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          Print Slip
        </button>
        <button
          onClick={onClear}
          className="rounded-lg px-5 py-2.5 text-sm font-medium"
          style={{ border: "1px solid var(--line)", color: "var(--muted)" }}
        >
          Clear / New Record
        </button>
      </div>
    </div>
  );
}
