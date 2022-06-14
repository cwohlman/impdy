import { Link, useSubmit } from "@remix-run/react";
import { ExtendedCard } from "~/models/card.server";
import { ArrowsExpandIcon } from "@heroicons/react/solid";
export type CardListItemParams = {
  card: ExtendedCard;
  parent?: ExtendedCard;
  query?: string;
};

export default function CardListItem({ card }: CardListItemParams) {
  const resolve = useSubmit();

  return (
    <div className="my-2 flex overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="inline-flex  items-center justify-center rounded rounded-l-none rounded-t-none border border-transparent bg-green-50 px-2.5 py-1.5 text-xs font-medium text-black shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        <input
          type="checkbox"
          checked={card.resolutionId != null}
          onChange={(e) => {
            e.preventDefault();
            // the checked property reflects the post-change value
            if (! e.target.checked) {
              // Delete resolution
              resolve({ cardId: card.id, action: "unresolve" }, { method: "patch" })
            } else {
              resolve({ cardId: card.id, action: "resolve" }, { method: "patch" })
            }
          }}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      {/* <div className="grow"> */}
      <div
        className={
          "grow p-2  " +
          (card.resolutionId ? "text-sm italic text-gray-700" : "text-lg")
        }
      >
        {card.content}
      </div>
      <div className="self-center p-2 italic text-sm text-gray-700">
        {card.resolution ? (
          <div className="font-bold not-italic text-green-900">
            {card.resolution.content}
          </div>
        ) : card.children?.length ? (
          card.children.some((child) => child.resolutionId) ? (
            <div>
              Completed {card.children.filter((a) => a.resolutionId).length} of{" "}
              {card.children.length} tasks
            </div>
          ) : (
            <div>
              {card.children.length} Task{card.children.length > 1 ? "s" : ""}
            </div>
          )
        ) : (
          "TODO"
        )}
        {/* </div> */}
      </div>
      {/* <div className="flex flex-col">

      </div> */}

      <Link
        to={"/card/" + card.id}
        prefetch="intent"
        className="inline-flex  items-center justify-center rounded rounded-l-none rounded-b-none border border-transparent bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-black shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ArrowsExpandIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
