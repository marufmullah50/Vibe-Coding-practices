"use client";

import dynamic from "next/dynamic";

const KanbanBoard = dynamic(
  () =>
    import("@/components/KanbanBoard").then((m) => ({ default: m.KanbanBoard })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-[var(--gray)]">
        Loading board
      </div>
    ),
  },
);

export function BoardClient() {
  return <KanbanBoard />;
}
