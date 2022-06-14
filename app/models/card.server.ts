import { Card, User } from "@prisma/client";
import { prisma } from "~/db.server";

export type ExtendedCard = Card & {
  parent: Card | null;
  resolution: Card | null;
  children?: Card[];
};

export async function getAllCards({
  userId,
}: {
  userId: string;
}): Promise<ExtendedCard[]> {
  return prisma.card.findMany({
    where: {
      OR: [
        { userId },
        { authorId: userId },
        { assigneeId: userId },
        { project: { shares: { some: { userId } } } },
      ],
    },
    include: {
      parent: true,
      children: true,
      resolution: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCard({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}): Promise<ExtendedCard | null> {
  return prisma.card.findFirst({
    where: {
      AND: [
        {
          id: cardId,
        },
        {
          OR: [
            { userId },
            { authorId: userId },
            { assigneeId: userId },
            { project: { shares: { some: { userId } } } },
          ],
        },
      ],
    },
    include: {
      parent: true,
      children: {
        include: {
          resolution: true
        }
      },
      resolution: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function createCard({
  content,
  userId,
  parentId,
}: Pick<Card, "content" | "parentId"> & {
  userId: User["id"];
}) {
  return prisma.card.create({
    data: {
      content,
      // TODO: the projectId should be the parent card's projectId
      // TODO: auto-generate tags
      parent: parentId ? { connect: { id: parentId } } : undefined,
      user: {
        connect: {
          id: userId, // TODO: the ownerId should be parent card's ownerId.
        },
      },
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
