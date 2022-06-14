import { Link } from "@remix-run/react";
import { ExtendedCard } from "~/models/card.server";
import CardEntry from "./CardEntry";
import CardList from "./CardList";
import CardListItem from "./CardListItem";

export type CardViewParams = { card: ExtendedCard };

export default function CardView({ card }: CardViewParams) {
  return <div>
    <Link to={"/card/" + card.parent?.id}>{card.parent?.content}</Link>
    <CardListItem card={card} />
    <p>Todos</p>
    <CardList cards={card.children as ExtendedCard[]} />
    <p>Add Todo</p>
    <CardEntry parent={card} />
  </div>
}