import Link from "next/link";
import { signOut } from "@/auth";
const links = [["/dashboard", "Acasă", "⌂"], ["/products", "Produse", "□"], ["/listings", "Listări", "◎"], ["/sales", "Vânzări", "↗"]];
export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh md:grid md:grid-cols-[230px_1fr]">
    <aside className="hidden border-r bg-white p-5 md:flex md:flex-col">
      <Link href="/dashboard" className="text-xl font-black text-mint">Vinted Tracker</Link>
      <nav className="mt-8 grid gap-2">{links.map(([href, label, icon]) => <Link key={href} href={href} className="rounded-xl px-3 py-3 font-semibold hover:bg-cream"><span className="mr-3">{icon}</span>{label}</Link>)}</nav>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }} className="mt-auto"><button className="btn btn-secondary w-full">Ieșire</button></form>
    </aside>
    <div className="min-w-0 pb-20 md:pb-0">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur md:px-8"><Link href="/dashboard" className="font-black text-mint md:hidden">Vinted Tracker</Link><span className="hidden text-sm text-slate-500 md:block">Profitul tău, clar și simplu.</span><Link href="/products/new" className="btn btn-primary !min-h-10">+ Produs</Link></header>
      <main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main>
    </div>
    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t bg-white px-1 pb-[env(safe-area-inset-bottom)] md:hidden">
      {links.map(([href, label, icon]) => <Link key={href} href={href} className="grid min-h-16 place-items-center py-2 text-xs font-semibold"><span className="text-lg leading-none">{icon}</span>{label}</Link>)}
    </nav>
  </div>;
}
