import { Link } from "@remix-run/react";
import { ExtendedCard } from "~/models/card.server";
import CardEntry from "./CardEntry";
import CardList from "./CardList";
import CardListItem from "./CardListItem";

export type CardViewParams = { card: ExtendedCard };

export default function CardView({ card }: CardViewParams) {
  return <div className="bg-white rounded-lg shadow p-1 pt-2 pl-2">
    <Link className="mb-5" to={"/card/" + card.parent?.id}>{card.parent?.content}</Link>
    <div className="bg-lime-100 rounded-lg shadow p-5 -mr-5 -mb-5">
      {/* <CardListItem card={card} /> */}
      <p>{card.content}</p>
      {card.resolution ? <p>{card.resolution.content}</p> : null}
      {/* <p>Todos</p> */}
      <CardList cards={card.children as ExtendedCard[]} />
      {/* <p>Add Todo</p> */}
      <CardEntry parent={card} />
    </div>
  </div>
}