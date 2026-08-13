import type { ReactNode } from "react";

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{description}</p>
      )}
    </div>
  );
}
