import { ActionFunction, json } from "@remix-run/node";
import { createCard, ExtendedCard } from "~/models/card.server";
import { requireUserId } from "~/session.server";

export type ActionData = {
  errors?: { content: string; };
  card?: ExtendedCard;
};


export const action: ActionFunction = async ({ request }) => {
  console.log('action');

  const userId = await requireUserId(request);

  const formData = await request.formData();
  const content = formData.get("content");
  const parentId = formData.get("parentId");


  if (typeof content !== "string" || content.length === 0) {
    return json<ActionData>(
      { errors: { content: "Content is required" } },
      { status: 400 }
    );
  }

  console.log(content, parentId)

  const card = await createCard({ content, userId, parentId: typeof parentId == "string" ? parentId : null });

  return json({ card });
};
