import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDoneCards } from "~/models/card.server";
import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import { requireUserId } from "~/session.server";
import { useState } from "react";
import CardEntryAndSearch from "~/components/CardEntryAndSearch";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  cards: Awaited<ReturnType<typeof getDoneCards>>;
};

export { action } from '~/code/createCardAction';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return json<LoaderData>({ cards: await getDoneCards({ userId }) });
};

export default function ListRoute() {
  const { cards } = useLoaderData<LoaderData>();

  return (
      <Layout title="Tada!">
        <CardList cards={cards} />
      </Layout>
  );
}