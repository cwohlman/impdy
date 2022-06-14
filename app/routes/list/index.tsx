import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCards, createCard } from "~/models/card.server";
import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import { requireUserId } from "~/session.server";
import { Card } from "@prisma/client";
import { useState } from "react";
import CardEntryAndSearch from "~/components/CardEntryAndSearch";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  cards: Awaited<ReturnType<typeof getCards>>;
};

type ActionData = {
  errors?: { content: string },
  card?: Card,
}


export const action: ActionFunction = async ({ request }) => {
  console.log('action');

  const userId = await requireUserId(request);

  const formData = await request.formData();
  const content = formData.get("content");


  if (typeof content !== "string" || content.length === 0) {
    return json<ActionData>(
      { errors: { content: "Content is required" } },
      { status: 400 }
    );
  }

  const card = await createCard({ content, userId });

  return json({ card });
};


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return json<LoaderData>({ cards: await getCards({ userId }) });
};

export default function ListRoute() {
  const [query, setQuery] = useState("");
  const { cards } = useLoaderData<LoaderData>();

  return (
    <main>
      <Layout>
        <CardEntryAndSearch query={query} setQuery={setQuery} />
        <CardList cards={cards} query={query} />
      </Layout>
    </main>
  );
}