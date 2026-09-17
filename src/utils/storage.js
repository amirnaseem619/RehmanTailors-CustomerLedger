export const STORAGE_KEY = "rehman_tailors_customers_v1";

// Older saved records stored a single string for `collar` and had
// cuff/pocket/damanEdge fields that no longer exist. This brings any
// old record up to the current shape so nothing breaks when re-opened.
function normalizeCustomer(c) {
  const { cuff, pocket, damanEdge, ...rest } = c;
  return {
    ...rest,
    collar: Array.isArray(c.collar) ? c.collar : c.collar ? [c.collar] : [],
  };
}

export function loadCustomers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeCustomer) : [];
  } catch (e) {
    console.error("Failed to load customers", e);
    return [];
  }
}

export function saveCustomers(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error("Failed to save customers", e);
    return false;
  }
}
