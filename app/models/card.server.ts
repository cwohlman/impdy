import { Card, User } from "@prisma/client";
import { prisma } from "~/db.server";

export type ExtendedCard = Card & {
  parent: Card | null;
  resolution: Card | null;
  children?: Card[];
};

export async function getActiveCards({
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
      parentId: null,
      resolutionId: null,
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

export async function getDoneCards({
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
      resolutionId: { not: null },
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
          resolution: true,
        },
      },
      resolution: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCard({
  content,
  userId,
  parentId,
  resolvesParent,
}: {
  userId: string;
  content: string;
  parentId?: string;
  resolvesParent?: boolean;
}) {
  const parent =
    typeof parentId == "string"
      ? await prisma.card.findFirst({ where: { id: parentId } })
      : null;

  return prisma.card.create({
    data: {
      content,
      // TODO: the projectId should be the parent card's projectId
      // TODO: auto-generate tags
      parentId: parentId ? parentId : undefined,
      userId: parent ? parent.userId : userId,
      projectId: parent ? parent.projectId : undefined,
      authorId: userId,

      resolves:
        parent && resolvesParent ? { connect: { id: parent.id } } : undefined,
    },
  });
}

export async function unresolveCard({ cardId }: { cardId: string }) {
  return prisma.card.update({
    where: { id: cardId },
    data: { resolutionId: null },
  });
}
