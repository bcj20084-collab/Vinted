export const ron = (value: number | string) =>
  new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(Number(value));
export const date = (value: Date | string) =>
  new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium" }).format(new Date(value));
