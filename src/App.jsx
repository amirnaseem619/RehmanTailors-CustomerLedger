import { useState, useEffect, useMemo, useRef } from "react";
import Header from "./components/Header.jsx";
import CustomerListItem from "./components/CustomerListItem.jsx";
import CustomerForm from "./components/CustomerForm.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import SuccessToast from "./components/SuccessToast.jsx";
import { loadCustomers, saveCustomers } from "./utils/storage.js";
import { blankCustomer, nextCustomerId } from "./utils/customer.js";

export default function App() {
  const [customers, setCustomers] = useState(() => loadCustomers());
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    saveCustomers(customers);
  }, [customers]);

  useEffect(() => {
    if (!draft) {
      setDraft(blankCustomer(nextCustomerId(customers)));
    }
    // eslint-disable-next-line
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.id || "").toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q)
    );
  }, [customers, query]);

  const handleSelect = (id) => {
    const found = customers.find((c) => c.id === id);
    if (found) {
      setSelectedId(id);
      setDraft(JSON.parse(JSON.stringify(found)));
    }
  };

  const handleNewCustomer = () => {
    setSelectedId(null);
    setDraft(blankCustomer(nextCustomerId(customers)));
  };

  const handleSave = () => {
    if (!draft.name.trim()) {
      alert("Please enter the client's name before saving.");
      return;
    }
    if (isSaving) return;

    const wasExisting = customers.some((c) => c.id === draft.id);
    setIsSaving(true);

    setTimeout(() => {
      setCustomers((prev) => {
        const exists = prev.some((c) => c.id === draft.id);
        const stamped = { ...draft, updatedAt: new Date().toISOString() };
        if (exists) {
          return prev.map((c) => (c.id === draft.id ? stamped : c));
        }
        return [stamped, ...prev];
      });
      setSelectedId(draft.id);
      setIsSaving(false);
      setToast(wasExisting ? "Customer updated successfully" : "Customer added successfully");
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 2400);
    }, 900);
  };

  const requestDelete = (id) => setPendingDelete(id);
  const confirmDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== pendingDelete));
    if (selectedId === pendingDelete) handleNewCustomer();
    setPendingDelete(null);
  };

  if (!draft) return null;

  return (
    <div className="min-h-screen">
      <Header query={query} setQuery={setQuery} onNewCustomer={handleNewCustomer} count={customers.length} />

      <main className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-[280px_1fr] gap-6">
        <aside className="no-print">
          <h2 className="text-xs font-semibold tracking-wide mb-3" style={{ color: "var(--muted)" }}>
            {query ? "Search Results" : "All Customers"}
          </h2>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <p
                className="text-sm italic p-3 rounded-lg"
                style={{ color: "var(--muted)", border: "1px dashed var(--line)" }}
              >
                {customers.length === 0 ? "No customers yet — save your first record." : "No matches found."}
              </p>
            )}
            {filtered.map((c) => (
              <CustomerListItem
                key={c.id}
                customer={c}
                active={c.id === selectedId}
                onSelect={handleSelect}
                onDelete={requestDelete}
              />
            ))}
          </div>
        </aside>

        <section>
          <CustomerForm
            customer={draft}
            onChange={setDraft}
            onSave={handleSave}
            onClear={handleNewCustomer}
            isEditingExisting={!!selectedId}
            isSaving={isSaving}
          />
        </section>
      </main>

      <ConfirmDialog
        open={!!pendingDelete}
        message={"Delete this customer record? This can't be undone."}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <SuccessToast message={toast} />

      <footer className="max-w-6xl mx-auto px-5 py-6 text-xs no-print" style={{ color: "var(--muted)" }}>
        Data is stored privately in this browser on this device. Clearing browser data will erase records.
      </footer>
    </div>
  );
}
