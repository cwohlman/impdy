import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { ExtendedCard } from "~/models/card.server";

export type CardEntryParams = {
  parent?: ExtendedCard;
};

export default function CardEntry({ parent }: CardEntryParams) {
  const transition = useTransition();
  const isSubmitting = transition.state == "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <Form className="sm:p-2" method="post" ref={formRef}>
      <label
        htmlFor="query"
        className="sr-only block text-sm font-medium text-gray-700"
      >
        Create Card
      </label>
      <div className="mt-1">
        <input
          ref={inputRef}
          type="search"
          name="content"
          id="query"
          className="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:rounded-md sm:text-sm"
          placeholder="Card title"
          aria-describedby="query-description"
        />
      </div>
    </Form>
  );
}
