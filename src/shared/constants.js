export const COMPANIES = [
  "AUTOMARKET 22",
  "ARA GROUP",
  "Motosviqt99",
  "MAKSI GROUP",
  "Mk-Market",
];

export const MARKETPLACES = ["eBay", "Temu", "Amazon", "EMAG"];

export const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const YEARS = Array.from(
  { length: new Date().getFullYear() - 2022 + 1 },
  (_, i) => String(2022 + i)
);

export const WAREHOUSE_TYPES = [
  { label: "Warehouse (BG)", value: "warehouse_bg" },
  { label: "Warehouse (DE)", value: "warehouse_de" },
  { label: "TAROS", value: "taros" },
];

export const AMAZON_DOCUMENT_TYPES = [
  { label: "Invoice", value: "invoice" },
  { label: "Credit Note", value: "credit_note" },
];
