export default function SuccessToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pointer-events-none" style={{ paddingTop: "18vh" }}>
      <div
        className="toast-pop pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-4 shadow-2xl"
        style={{ background: "var(--card)", border: "1px solid var(--line)" }}
      >
        <span
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 34, height: 34, background: "#2F9E44" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          {message}
        </span>
      </div>
    </div>
  );
}
