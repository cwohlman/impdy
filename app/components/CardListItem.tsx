import { ExtendedCard } from "~/models/card.server";

export type CardListItemParams = {
  card: ExtendedCard;
  parent?: ExtendedCard;
  query?: string;
};

export default function CardListItem({ card }: CardListItemParams) {
  return (
    <div className="my-2 flex overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="grow">
        <div className="p-2 text-lg">{card.content}</div>
        <div className="p-2 text-sm text-gray-700 italic">
          {card.resolution ? (
            <div>{card.resolution.content}</div>
          ) : card.children?.length ? (
            card.children.some(child => child.resolutionId) ?
              <div>Completed {card.children.filter(a => a.resolutionId).length} of {card.children.length} tasks</div> :
              <div>{card.children.length} Task{card.children.length > 1 ? "s" : ""}</div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        <button className="inline-flex grow items-center justify-center rounded rounded-l-none rounded-b-none border border-transparent bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-black shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Start
        </button>
        <button className="inline-flex grow items-center justify-center rounded rounded-l-none rounded-t-none border border-transparent bg-green-50 px-2.5 py-1.5 text-xs font-medium text-black shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Resolve
        </button>
      </div>
    </div>
  );
}
