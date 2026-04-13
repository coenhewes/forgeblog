"use client";

import { useState } from "react";
import { InlineText } from "@/components/blog/InlineFormat";

/** Client-side FAQ accordion with expand/collapse. */
export function FAQAccordion({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </span>
              <span
                className="shrink-0 text-zinc-400 transition-transform"
                aria-hidden="true"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-zinc-600 dark:text-zinc-400">
                <InlineText text={faq.answer} />
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
