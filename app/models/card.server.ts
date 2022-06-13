import { prisma } from "~/db.server";

export async function getCards() {
  return prisma.card.findMany();
}