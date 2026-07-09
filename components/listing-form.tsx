"use client";
import { useRouter } from "next/navigation"; import { useState } from "react";
export function ListingForm({ products }: { products: {id:string;name:string}[] }) {
 const router=useRouter(); const [pending,setPending]=useState(false); async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setPending(true);const body=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch("/api/listings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok){router.refresh();(e.target as HTMLFormElement).reset()}setPending(false)}
 return <form onSubmit={submit} className="card grid gap-3 md:grid-cols-[1fr_180px_auto] md:items-end"><label>Produs<select name="productId" required><option value="">Alege produsul</option>{products.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label><label>Preț listare<input name="listPrice" type="number" min=".01" step=".01" required/></label><button className="btn btn-primary" disabled={pending}>Creează listare</button></form>
}
