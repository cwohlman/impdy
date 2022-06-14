import { ExtendedCard } from "~/models/card.server"
import CardListItem from "~/components/CardListItem"
import filterCards from "~/code/filterCards";

export type CardListParams = {
  cards: ExtendedCard[],
  parent?: ExtendedCard,
  query?: string,
}

export default function CardList({ cards, parent, query }: CardListParams) {

  const filteredCards = filterCards(cards, query);
  const visibleCards = filteredCards.length ? filteredCards : cards;

  return <div>
    {query ? <div className={"mt-2 pl-3 text-sm text-gray-500 " + (filteredCards.length ? "" : "text-amber-800")}>{filteredCards.length} matching of {cards.length}</div> : null}
    {visibleCards.map(card => {
      return <CardListItem key={card.id} card={card} parent={parent} query={query} />
    })}
  </div>
}