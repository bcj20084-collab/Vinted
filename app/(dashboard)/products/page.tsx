import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ron } from "@/lib/format";
export const dynamic = "force-dynamic";
export default async function Products({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const items = await prisma.product.findMany({ where: q ? { OR: [{ name: { contains:q, mode:"insensitive" } }, { brand: { contains:q, mode:"insensitive" } }] } : {}, include:{listings:true}, orderBy:{createdAt:"desc"} });
  return <div className="grid gap-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold text-mint">INVENTAR</p><h1 className="text-3xl font-black">Produse</h1></div><Link href="/products/new" className="btn btn-primary">+ Adaugă</Link></div>
    <form className="card !p-3"><input name="q" defaultValue={q} placeholder="Caută după nume sau brand…" /></form>
    {!items.length ? <div className="card py-16 text-center"><h2 className="font-bold">Niciun produs găsit</h2><p className="mt-1 text-slate-500">Adaugă primul produs în inventar.</p></div> : <>
    <div className="card desktop-table table-wrap"><table><thead><tr><th>Produs</th><th>Categorie</th><th>Cost</th><th>Status</th><th></th></tr></thead><tbody>{items.map(x=><tr key={x.id}><td><b>{x.name}</b><br/><small>{x.brand||"Fără brand"} · {x.size||"—"}</small></td><td>{x.category||"—"}</td><td>{ron(Number(x.costPrice))}</td><td>{x.listings.some(l=>l.status==="ACTIVE")?"Activ":"În stoc"}</td><td><Link className="font-bold text-mint" href={`/products/${x.id}`}>Detalii →</Link></td></tr>)}</tbody></table></div>
    <div className="mobile-cards grid gap-3">{items.map(x=><Link href={`/products/${x.id}`} className="card flex items-center gap-3" key={x.id}><div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-cream text-2xl">□</div><div className="min-w-0 flex-1"><h2 className="truncate font-bold">{x.name}</h2><p className="truncate text-sm text-slate-500">{x.brand||"Fără brand"} · {x.category||"Fără categorie"}</p><b className="mt-1 block text-mint">{ron(Number(x.costPrice))}</b></div><span>›</span></Link>)}</div></>}</div>;
}
