import { ActionFunction, json } from "@remix-run/node";
import { createCard, ExtendedCard, unresolveCard } from "~/models/card.server";
import { requireUserId } from "~/session.server";

export type ActionData = {
  errors?: { content?: string; cardId?: string };
  card?: ExtendedCard;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const content = formData.get("content");
  const parentId = formData.get("parentId");
  const cardId = formData.get("cardId");
  const action = formData.get("action");

  if (action == "resolve") {
    if (typeof cardId !== "string" || cardId.length === 0) {
      return json<ActionData>(
        { errors: { cardId: "cardId is required" } },
        { status: 400 }
      );
    }

    const card = await createCard({
      content: typeof content == "string" ? content : "Done!",
      userId,
      parentId: cardId,
      resolvesParent: true,
    }) as ExtendedCard;

    return json<ActionData>({ card });
  }

  if (action == "unresolve") {
    if (typeof cardId !== "string" || cardId.length === 0) {
      return json<ActionData>(
        { errors: { cardId: "cardId is required" } },
        { status: 400 }
      );
    }

    const card = await unresolveCard({ cardId: cardId }) as ExtendedCard;

    return json<ActionData>({ card })
  }

  if (typeof action == "string") {
    throw new Response("Action not recognized", { status: 400 });
  }

  if (typeof content !== "string" || content.length === 0) {
    return json<ActionData>(
      { errors: { content: "Content is required" } },
      { status: 400 }
    );
  }

  const card = await createCard({
    content,
    userId,
    parentId: typeof parentId == "string" ? parentId : undefined,
  });

  return json({ card });
};
