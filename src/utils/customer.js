import { emptyMeasurements } from "../data/measurementFields.js";

export function nextCustomerId(list) {
  let max = 1000;
  list.forEach((c) => {
    const match = /^C-(\d+)$/.exec(c.id || "");
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > max) max = n;
    }
  });
  return "C-" + (max + 1);
}

export function blankCustomer(nextId) {
  return {
    id: nextId,
    name: "",
    phone: "",
    orderDate: "",
    fee: "",
    notes: "",
    measurements: emptyMeasurements(),
    collar: ["gol"],
    updatedAt: null,
  };
}
