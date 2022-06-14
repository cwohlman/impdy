import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getActiveCards } from "~/models/card.server";
import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import { requireUserId } from "~/session.server";
import { useState } from "react";
import CardEntryAndSearch from "~/components/CardEntryAndSearch";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  cards: Awaited<ReturnType<typeof getActiveCards>>;
};

export { action } from '~/code/createCardAction';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return json<LoaderData>({ cards: await getActiveCards({ userId }) });
};

export default function ListRoute() {
  const [query, setQuery] = useState("");
  const { cards } = useLoaderData<LoaderData>();

  return (
      <Layout>
        <CardEntryAndSearch query={query} setQuery={setQuery} />
        <CardList cards={cards} query={query} />
      </Layout>
  );
}