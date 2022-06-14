import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import CardView from "~/components/CardView";
import Layout from "~/components/Layout";
import { ExtendedCard, getCard } from "~/models/card.server";
import { requireUserId } from "~/session.server";

export { action } from "~/code/createCardAction";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  invariant(params.cardId, "cardId not found");
  const cardId = params.cardId;

  const card = await getCard({ userId, cardId });

  if (! card) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ card });
};

export type LoaderData = {
  card: ExtendedCard
}

export default function CardPage() {
  const { card } = useLoaderData<LoaderData>();
  return <Layout>
    <CardView card={card} />
  </Layout>
}