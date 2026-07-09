import { prisma } from "@/lib/prisma";
import { listingSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json(await prisma.listing.findMany({ include: { product: true, sale: true }, orderBy: { listedAt: "desc" } }));
}
export async function POST(request: Request) {
  const parsed = listingSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  return NextResponse.json(await prisma.listing.create({ data: parsed.data }), { status: 201 });
}
