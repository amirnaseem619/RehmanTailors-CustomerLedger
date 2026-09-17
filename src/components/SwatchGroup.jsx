export default function SwatchGroup({ label, faLabel, options, value, onChange, multi = false }) {
  const isActive = (optId) => (multi ? Array.isArray(value) && value.includes(optId) : value === optId);

  const handleClick = (optId) => {
    if (!multi) {
      onChange(optId);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    if (current.includes(optId)) {
      onChange(current.filter((id) => id !== optId));
    } else {
      onChange([...current, optId]);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          {multi && (
            <span className="text-[10px] italic" style={{ color: "var(--muted)" }}>
              Select one or more
            </span>
          )}
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {faLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = isActive(opt.id);
          const hasIcon = Object.prototype.hasOwnProperty.call(opt, "icon");
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleClick(opt.id)}
              aria-pressed={active}
              className="swatch rounded-lg px-3 py-2 text-xs font-medium text-center flex flex-col items-center gap-1.5 relative"
              style={{
                width: hasIcon ? 96 : "auto",
                minWidth: hasIcon ? 96 : 86,
                background: active ? "var(--navy)" : "var(--card)",
                color: active ? "#F2ECDD" : "var(--ink)",
                border: "1px solid " + (active ? "var(--navy)" : "var(--line)"),
              }}
            >
              {multi && active && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "var(--gold)", color: "#1B2540" }}
                >
                  ✓
                </span>
              )}
              {hasIcon && (
                <div
                  className="w-full h-12 rounded flex items-center justify-center overflow-hidden"
                  style={{ background: active ? "rgba(255,255,255,0.9)" : "#FBF8F1" }}
                >
                  {opt.icon ? (
                    <img src={opt.icon} alt={opt.en} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                      —
                    </span>
                  )}
                </div>
              )}
              <div>{opt.en}</div>
              {opt.fa && (
                <div className="text-[10px]" style={{ color: active ? "var(--gold-soft)" : "var(--muted)" }}>
                  {opt.fa}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
