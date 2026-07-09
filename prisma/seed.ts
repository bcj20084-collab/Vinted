import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("Setează ADMIN_EMAIL și ADMIN_PASSWORD.");
  await prisma.user.upsert({
    where: { email },
    update: { password: await hash(password, 12) },
    create: { email, password: await hash(password, 12) }
  });
}
main().finally(() => prisma.$disconnect());
