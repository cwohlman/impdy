import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { ExtendedCard } from "~/models/card.server";

export type CardEntryAndSearchParams = {
  parent?: ExtendedCard;
  query: string;
  setQuery: (query: string) => void;
};

export default function CardEntryAndSearch({
  query,
  setQuery,
}: CardEntryAndSearchParams) {
  const transition = useTransition();
  const isSubmitting = transition.state == "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
      setQuery("");
    }
  }, [isSubmitting]);
  
  return (
    <Form className="" method="post" ref={formRef}>
      <label htmlFor="query" className="block text-sm font-medium text-gray-700 sr-only">
        Search or Create Task
      </label>
      <div className="mt-1">
      <input
        ref={inputRef}
        type="search"
        name="content"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 sm:rounded-md"
        placeholder="Search for or create a new card"
        aria-describedby="query-description"
      />
      </div>
      <p className="mt-2 pl-3 text-sm text-gray-500" id="query-description">
        {query ? "Press enter to create a new card" : null}
      </p>
    </Form>
  );
}
