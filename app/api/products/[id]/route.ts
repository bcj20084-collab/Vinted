import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
type Params = { params: Promise<{ id: string }> };
export async function GET(_: Request, { params }: Params) {
  const item = await prisma.product.findUnique({ where: await params, include: { listings: { include: { sale: true }, orderBy: { listedAt: "desc" } } } });
  return item ? NextResponse.json(item) : NextResponse.json({ error: "Produs inexistent." }, { status: 404 });
}
export async function PATCH(request: Request, { params }: Params) {
  const parsed = productSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  return NextResponse.json(await prisma.product.update({ where: await params, data: parsed.data }));
}
export async function DELETE(_: Request, { params }: Params) {
  await prisma.product.delete({ where: await params });
  return new NextResponse(null, { status: 204 });
}
