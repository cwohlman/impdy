import { useActionData } from "@remix-run/react";
import CardEntry from "~/components/CardEntry";
import Layout from "~/components/Layout";

export { action } from "~/code/createCardAction";

import { ActionData } from "~/code/createCardAction";
import CardListItem from "~/components/CardListItem";
import { useEffect, useState } from "react";

export default function Cards() {
  const actionData = useActionData<ActionData>();
  const [lastActionData, saveActionData] = useState<ActionData>();

  useEffect(() => {
    if (actionData) saveActionData(actionData);
  }, [actionData]);
  return (
    <Layout>
      <CardEntry />
      {lastActionData?.card ? (
        <div>
          <p className="m-2 italic text-stone-700">
            Success! Your card was created.
          </p>

          <CardListItem card={lastActionData?.card} />
        </div>
      ) : null}
    </Layout>
  );
}
