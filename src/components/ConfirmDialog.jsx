export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4" style={{ background: "rgba(19,26,48,0.55)" }}>
      <div className="rounded-xl p-5 max-w-sm w-full" style={{ background: "var(--card)" }}>
        <p className="text-sm mb-4" style={{ color: "var(--ink)" }}>
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md px-3 py-1.5 text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md px-3 py-1.5 text-sm font-medium"
            style={{ background: "#B4413C", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
