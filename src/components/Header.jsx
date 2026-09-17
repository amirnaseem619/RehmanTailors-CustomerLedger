import Logo from "./Logo.jsx";

export default function Header({ query, setQuery, onNewCustomer, count }) {
  return (
    <header className="sticky top-0 z-20" style={{ background: "var(--navy)" }}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-3">
          <Logo size={46} />
          <div>
            <h1 className="font-display text-2xl leading-tight" style={{ color: "#F2ECDD" }}>
              Rehman Tailors
            </h1>
            <p className="text-[11px] tracking-wide" style={{ color: "var(--gold-soft)" }}>
              Bespoke Persian &amp; Afghan Suits
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[220px]">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B4A98F"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ID (e.g. C-1004)"
              className="w-full rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white/95 placeholder:text-gray-400"
              style={{ border: "1px solid var(--gold)", color: "var(--ink)" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "var(--gold-soft)" }}>
            {count} customer{count === 1 ? "" : "s"}
          </span>
          <button
            onClick={onNewCustomer}
            className="rounded-lg px-4 py-2.5 text-sm font-medium"
            style={{ background: "var(--gold)", color: "#1B2540" }}
          >
            + New Customer
          </button>
        </div>
      </div>
    </header>
  );
}
