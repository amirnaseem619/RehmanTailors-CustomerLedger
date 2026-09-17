export default function CustomerListItem({ customer, active, onSelect, onDelete }) {
  return (
    <button
      onClick={() => onSelect(customer.id)}
      className="w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center justify-between gap-2 group"
      style={{
        background: active ? "var(--navy)" : "var(--card)",
        border: "1px solid " + (active ? "var(--navy)" : "var(--line)"),
      }}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: active ? "#F2ECDD" : "var(--ink)" }}>
          {customer.name || <span className="italic" style={{ color: "var(--muted)" }}>Unnamed</span>}
        </p>
        <p className="text-xs" style={{ color: active ? "var(--gold-soft)" : "var(--muted)" }}>
          {customer.id}
          {customer.phone ? " · " + customer.phone : ""}
        </p>
      </div>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(customer.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            onDelete(customer.id);
          }
        }}
        className="text-xs opacity-0 group-hover:opacity-100 shrink-0 px-2 py-1 rounded"
        style={{
          color: active ? "#F2A0A0" : "#B4413C",
          background: active ? "rgba(255,255,255,0.08)" : "transparent",
        }}
        aria-label={"Delete " + (customer.name || customer.id)}
      >
        Delete
      </span>
    </button>
  );
}
