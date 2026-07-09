import { prisma } from "@/lib/prisma";
import { saleSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const soldAt = p.get("from") || p.get("to") ? { gte: p.get("from") ? new Date(p.get("from")!) : undefined, lte: p.get("to") ? new Date(p.get("to")! + "T23:59:59") : undefined } : undefined;
  return NextResponse.json(await prisma.sale.findMany({ where: { soldAt }, include: { listing: { include: { product: true } } }, orderBy: { soldAt: "desc" } }));
}
export async function POST(request: Request) {
  const parsed = saleSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const { listingId, salePrice, vintedFee, shippingCost, soldAt } = parsed.data;
  const listing = await prisma.listing.findUnique({ where: { id: listingId }, include: { product: true } });
  if (!listing) return NextResponse.json({ error: "Listarea nu există." }, { status: 404 });
  const netProfit = salePrice - vintedFee - shippingCost - Number(listing.product.costPrice);
  const sale = await prisma.$transaction(async tx => {
    const created = await tx.sale.create({ data: { listingId, salePrice, vintedFee, shippingCost, soldAt, netProfit } });
    await tx.listing.update({ where: { id: listingId }, data: { status: "SOLD" } });
    return created;
  });
  return NextResponse.json(sale, { status: 201 });
}
