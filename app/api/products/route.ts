import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  return NextResponse.json(await prisma.product.findMany({ where: q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { brand: { contains: q, mode: "insensitive" } }] } : {}, include: { listings: true }, orderBy: { createdAt: "desc" } }));
}
export async function POST(request: Request) {
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const { imageUrl, ...data } = parsed.data;
  return NextResponse.json(await prisma.product.create({ data: { ...data, imageUrl: imageUrl || null } }), { status: 201 });
}
