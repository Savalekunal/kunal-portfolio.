import { LuCheck, LuX, LuTriangleAlert } from "react-icons/lu";

export type Status = "passed" | "failed" | "blocked";

const CONFIG: Record<Status, { label: string; icon: typeof LuCheck; className: string }> = {
  passed: { label: "Passed", icon: LuCheck, className: "text-pass bg-pass-soft" },
  failed: { label: "Failed", icon: LuX, className: "text-fail bg-fail-soft" },
  blocked: { label: "Blocked", icon: LuTriangleAlert, className: "text-warn bg-warn-soft" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, icon: Icon, className } = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-display text-[11px] ${className}`}
    >
      <Icon size={11} aria-hidden />
      {label}
    </span>
  );
}
