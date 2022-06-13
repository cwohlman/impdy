import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCards } from "~/models/card.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  cards: Awaited<ReturnType<typeof getCards>>;
};


export const loader = async () => {
  return json<LoaderData>({ cards: await getCards() });
};

export default function List() {
  const { cards } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>List of Cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            {card.content}
          </li>
        ))}
      </ul>
    </main>
  );
}