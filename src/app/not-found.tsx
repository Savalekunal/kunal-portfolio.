import Link from "next/link";
import { LuBug, LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, #000 0%, transparent 75%)",
        }}
      />

      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-fail-soft text-fail">
        <LuBug size={28} />
      </span>

      <p className="mb-2 font-display text-[13px] uppercase tracking-wide text-fail">404 · test failed</p>
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        This route doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-ink-muted">
        Assertion failed: expected a page at this URL, found nothing. Logging the defect and sending you back.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
      >
        <LuArrowLeft size={15} aria-hidden />
        Back to home
      </Link>
    </main>
  );
}
