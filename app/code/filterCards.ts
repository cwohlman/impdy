import { ExtendedCard } from "~/models/card.server";

export default function filterCards(cards: ExtendedCard[], query?: string): ExtendedCard[] {
  if (! query) return cards;

  return cards.filter(a => a.content.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) != -1)
}