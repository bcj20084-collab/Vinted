import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { date, ron } from "@/lib/format";
export const dynamic = "force-dynamic";
export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const product = await prisma.product.findUnique({ where: await params, include: { listings: { include: { sale: true }, orderBy: { listedAt: "desc" } } } });
  if (!product) notFound();
  return <div className="grid gap-5"><Link href="/products" className="font-bold text-mint">← Înapoi la produse</Link>
    <section className="card grid gap-5 md:grid-cols-[160px_1fr]"><div className="grid aspect-square place-items-center rounded-2xl bg-cream text-5xl">□</div><div><p className="text-sm font-bold text-mint">{product.category || "FĂRĂ CATEGORIE"}</p><h1 className="text-3xl font-black">{product.name}</h1><p className="mt-2 text-slate-600">{product.brand || "Fără brand"} · Mărime {product.size || "—"}</p><div className="mt-5"><span className="text-sm text-slate-500">Cost achiziție</span><b className="block text-2xl">{ron(Number(product.costPrice))}</b></div>{product.notes && <p className="mt-4 whitespace-pre-wrap">{product.notes}</p>}</div></section>
    <section className="card"><h2 className="text-xl font-bold">Istoric listări</h2>{product.listings.length ? <div className="mt-4 grid gap-3">{product.listings.map(x=><div className="flex flex-wrap items-center justify-between gap-2 border-b py-3 last:border-0" key={x.id}><div><b>{ron(Number(x.listPrice))}</b><p className="text-sm text-slate-500">{date(x.listedAt)}</p></div><span className="rounded-full bg-cream px-3 py-1 text-xs font-bold">{x.status}</span>{x.sale && <b className="text-emerald-700">{ron(Number(x.sale.netProfit))} profit</b>}</div>)}</div> : <p className="py-8 text-center text-slate-500">Produsul nu a fost listat încă.</p>}</section>
  </div>;
}
