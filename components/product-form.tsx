"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function ProductForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setPending(true); setError("");
    const form = new FormData(e.currentTarget); const body = Object.fromEntries(form);
    const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { router.push("/products"); router.refresh(); } else { setError((await res.json()).error); setPending(false); }
  }
  return <form onSubmit={submit} className="card grid gap-4 md:grid-cols-2">
    <label className="md:col-span-2">Nume produs<input name="name" required placeholder="Ex. Geacă denim" /></label>
    <label>Brand<input name="brand" placeholder="Ex. Zara" /></label><label>Categorie<input name="category" placeholder="Ex. Jachete" /></label>
    <label>Mărime<input name="size" placeholder="M" /></label><label>Stare<select name="condition" defaultValue="VERY_GOOD"><option value="NEW">Nou</option><option value="VERY_GOOD">Foarte bună</option><option value="GOOD">Bună</option><option value="SATISFACTORY">Satisfăcătoare</option></select></label>
    <label>Cost achiziție (RON)<input name="costPrice" type="number" step=".01" min="0" required /></label><label>Data achiziției<input name="purchaseDate" type="date" /></label>
    <label className="md:col-span-2">URL imagine<input name="imageUrl" type="url" placeholder="https://..." /></label><label className="md:col-span-2">Notițe<textarea name="notes" rows={4} /></label>
    {error && <p className="text-red-700 md:col-span-2">{error}</p>}<button className="btn btn-primary md:col-span-2" disabled={pending}>{pending ? "Se salvează…" : "Salvează produsul"}</button>
  </form>;
}
