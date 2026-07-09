import { ListingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const parsed = z.object({ listPrice: z.coerce.number().positive().optional(), status: z.nativeEnum(ListingStatus).optional() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data = { ...parsed.data, removedAt: parsed.data.status === "REMOVED" ? new Date() : undefined };
  return NextResponse.json(await prisma.listing.update({ where: await params, data }));
}
