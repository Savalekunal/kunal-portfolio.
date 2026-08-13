import type { ReactNode } from "react";

/**
 * Infinite horizontal scroller: the track holds two copies of the content
 * back to back and animates translateX(-50%) forever, so the moment the
 * last real item scrolls out, its duplicate is already in the same screen
 * position — the loop point is invisible. Pauses on hover so items stay
 * clickable/readable; a global prefers-reduced-motion rule (globals.css)
 * freezes the animation entirely for those users.
 */
export function Marquee({
  children,
  durationSeconds = 30,
  gapClassName = "gap-6",
}: {
  children: ReactNode;
  durationSeconds?: number;
  gapClassName?: string;
}) {
  return (
    <div className="group relative overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div
        className={`marquee-track flex w-max ${gapClassName} group-hover:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className={`flex shrink-0 ${gapClassName}`}>{children}</div>
        <div className={`flex shrink-0 ${gapClassName}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
