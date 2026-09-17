export const MEASURE_FIELDS = [
  { key: "qad", en: "Qad / Length", fa: "قد" },
  { key: "asteen", en: "Asteen / Sleeve", fa: "آستین" },
  { key: "shana", en: "Shana / Shoulder", fa: "شانه" },
  { key: "yakhan", en: "Yakhan / Collar", fa: "یخن" },
  { key: "baghal", en: "Baghal / Chest", fa: "بغل" },
  { key: "daman", en: "Daman / Hem", fa: "دامن" },
  { key: "qadTanban", en: "Qad Tanban", fa: "قد تنبان" },
  { key: "pacha", en: "Pacha / Leg Cuff", fa: "پاچه" },
];

export function emptyMeasurements() {
  const m = {};
  MEASURE_FIELDS.forEach((f) => {
    m[f.key] = "";
  });
  return m;
}
