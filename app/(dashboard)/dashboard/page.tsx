import { prisma } from "@/lib/prisma";
import { ron } from "@/lib/format";
import { ProfitChart } from "@/components/profit-chart";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const [sales, active] = await Promise.all([
    prisma.sale.findMany({ include: { listing: { include: { product: true } } }, orderBy: { soldAt: "asc" } }),
    prisma.listing.findMany({ where: { status: "ACTIVE" }, include: { product: true } })
  ]);
  const total = sales.reduce((s, x) => s + Number(x.netProfit), 0);
  const inventory = new Map(active.map(x => [x.productId, Number(x.product.costPrice)]));
  const monthly = new Map<string, number>();
  sales.forEach(x => { const key = x.soldAt.toLocaleDateString("ro-RO", { month: "short", year: "2-digit" }); monthly.set(key, (monthly.get(key) ?? 0) + Number(x.netProfit)); });
  const top = [...sales].sort((a,b) => Number(b.netProfit)-Number(a.netProfit)).slice(0,5);
  const averageDays = sales.length ? sales.reduce((s,x) => s + (x.soldAt.getTime()-x.listing.listedAt.getTime())/86400000, 0)/sales.length : 0;
  const conversion = sales.length + active.length ? sales.length / (sales.length + active.length) * 100 : 0;
  const kpis = [["Profit total", ron(total)], ["Produse vândute", String(sales.length)], ["Inventar activ", ron([...inventory.values()].reduce((a,b)=>a+b,0))], ["Profit mediu", ron(sales.length ? total/sales.length : 0)]];
  return <div className="grid gap-6">
    <div><p className="text-sm font-bold text-mint">PANOU GENERAL</p><h1 className="text-3xl font-black md:text-4xl">Bun venit înapoi</h1><p className="mt-2 text-slate-600">Iată cum merge magazinul tău.</p></div>
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">{kpis.map(([l,v]) => <article className="card" key={l}><p className="text-xs font-bold uppercase text-slate-500">{l}</p><strong className="mt-2 block text-xl md:text-2xl">{v}</strong></article>)}</section>
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]"><article className="card min-w-0"><h2 className="mb-4 text-lg font-bold">Profit lunar</h2><ProfitChart data={[...monthly].map(([month,profit])=>({month,profit}))}/></article>
    <article className="card"><h2 className="mb-4 text-lg font-bold">Indicatori</h2><dl className="grid gap-5"><div><dt className="text-sm text-slate-500">Timp mediu până la vânzare</dt><dd className="text-2xl font-black">{averageDays.toFixed(1)} zile</dd></div><div><dt className="text-sm text-slate-500">Rată de conversie</dt><dd className="text-2xl font-black">{conversion.toFixed(1)}%</dd></div></dl></article></section>
    <section className="card"><h2 className="mb-3 text-lg font-bold">Top produse profitabile</h2>{top.length ? <div className="grid gap-2">{top.map((x,i)=><div key={x.id} className="flex items-center justify-between border-b py-3 last:border-0"><span><b className="mr-3 text-mint">{i+1}</b>{x.listing.product.name}</span><b>{ron(Number(x.netProfit))}</b></div>)}</div> : <p className="py-8 text-center text-slate-500">Încă nu există vânzări.</p>}</section>
  </div>;
}
