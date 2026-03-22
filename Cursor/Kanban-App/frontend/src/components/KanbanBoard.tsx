"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import type { BoardState, CardData, ColumnDef } from "@/lib/kanban-types";
import {
  addCard,
  applyCardDrag,
  createInitialBoard,
  removeCard,
  renameColumn,
} from "@/lib/kanban-state";

function DragHandle(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="mt-0.5 shrink-0 rounded border border-transparent px-1 text-xs leading-none text-[var(--gray)] tabular-nums hover:text-[var(--navy)]"
      aria-label="Drag card"
      {...props}
    >
      ::
    </button>
  );
}

function SortableCard({
  card,
  onDelete,
}: {
  card: CardData;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      className={`rounded-xl border border-[color-mix(in_srgb,var(--primary)_22%,transparent)] bg-[var(--surface)] p-3 shadow-sm ring-1 ring-black/[0.03] ${
        isDragging ? "z-10 opacity-60 shadow-md" : ""
      }`}
      {...attributes}
    >
      <div className="flex gap-2">
        <DragHandle {...listeners} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[var(--navy)]">
            {card.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--gray)]">
            {card.details}
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="h-7 shrink-0 rounded-md border border-[color-mix(in_srgb,var(--secondary)_35%,transparent)] px-2 text-xs font-medium text-[var(--secondary)] hover:bg-[color-mix(in_srgb,var(--secondary)_08%,white)]"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

function CardPreview({ card }: { card: CardData }) {
  return (
    <article className="w-[280px] max-w-[min(280px,85vw)] rounded-xl border-2 border-[var(--accent)] bg-[var(--surface)] p-3 shadow-lg">
      <h3 className="text-sm font-semibold text-[var(--navy)]">{card.title}</h3>
      <p className="mt-1 text-xs text-[var(--gray)]">{card.details}</p>
    </article>
  );
}

function ColumnHeader({
  column,
  onRename,
}: {
  column: ColumnDef;
  onRename: (title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(column.title);

  if (editing) {
    return (
      <input
        autoFocus
        aria-label="Column title"
        data-testid={`column-title-input-${column.id}`}
        className="w-full rounded-md border border-[var(--primary)] bg-white px-2 py-1 text-sm font-semibold text-[var(--navy)] outline-none ring-2 ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          onRename(value);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") {
            setValue(column.title);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <button
      type="button"
      data-testid={`column-title-${column.id}`}
      className="group w-full rounded-md px-1 py-1 text-left"
      onClick={() => {
        setValue(column.title);
        setEditing(true);
      }}
    >
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--gray)]">
        Column
      </span>
      <span className="mt-0.5 block text-base font-semibold text-[var(--navy)] group-hover:text-[var(--primary)]">
        {column.title}
      </span>
    </button>
  );
}

function ColumnPanel({
  column,
  state,
  onRenameColumn,
  onAddCard,
  onDeleteCard,
}: {
  column: ColumnDef;
  state: BoardState;
  onRenameColumn: (columnId: string, title: string) => void;
  onAddCard: (title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
}) {
  const cardIds = state.cardIdsByColumn[column.id] ?? [];
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  return (
    <section
      data-testid={`column-${column.id}`}
      className="flex min-h-[420px] w-[300px] shrink-0 flex-col rounded-2xl border border-[color-mix(in_srgb,var(--navy)_12%,transparent)] bg-[color-mix(in_srgb,white_88%,var(--primary)_12%)] p-3 shadow-[0_18px_40px_-28px_rgba(3,33,71,0.55)]"
    >
      <header className="border-b border-[color-mix(in_srgb,var(--accent)_55%,transparent)] pb-2">
        <ColumnHeader
          column={column}
          onRename={(t) => onRenameColumn(column.id, t)}
        />
      </header>
      <div
        ref={setNodeRef}
        className={`mt-3 flex min-h-[240px] flex-1 flex-col ${
          isOver
            ? "rounded-xl ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[color-mix(in_srgb,white_88%,var(--primary)_12%)]"
            : ""
        }`}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-1 flex-col gap-2">
            {cardIds.map((id) => {
              const card = state.cardsById[id];
              if (!card) return null;
              return (
                <SortableCard
                  key={id}
                  card={card}
                  onDelete={() => onDeleteCard(id)}
                />
              );
            })}
          </div>
        </SortableContext>
      </div>
      <div className="mt-3 border-t border-black/[0.06] pt-3">
        {!adding ? (
          <button
            type="button"
            data-testid={`add-card-${column.id}`}
            className="w-full rounded-lg border border-dashed border-[color-mix(in_srgb,var(--primary)_45%,transparent)] py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] hover:bg-white/70"
            onClick={() => setAdding(true)}
          >
            Add card
          </button>
        ) : (
          <form
            className="space-y-2 rounded-xl border border-[color-mix(in_srgb,var(--navy)_10%,transparent)] bg-white/90 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              onAddCard(title, details);
              setTitle("");
              setDetails("");
              setAdding(false);
            }}
          >
            <input
              className="w-full rounded-md border border-black/10 px-2 py-1.5 text-sm text-[var(--navy)] outline-none focus:border-[var(--primary)]"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid={`new-card-title-${column.id}`}
            />
            <textarea
              className="min-h-[72px] w-full resize-y rounded-md border border-black/10 px-2 py-1.5 text-sm text-[var(--navy)] outline-none focus:border-[var(--primary)]"
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              data-testid={`new-card-details-${column.id}`}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                data-testid={`submit-card-${column.id}`}
                className="flex-1 rounded-lg bg-[var(--secondary)] py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105"
              >
                Add
              </button>
              <button
                type="button"
                className="rounded-lg border border-black/10 px-3 text-sm text-[var(--gray)] hover:bg-black/[0.03]"
                onClick={() => {
                  setAdding(false);
                  setTitle("");
                  setDetails("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export function KanbanBoard() {
  const [state, setState] = useState<BoardState>(() => createInitialBoard());
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const activeCard = useMemo(() => {
    if (!activeId) return null;
    return state.cardsById[activeId] ?? null;
  }, [activeId, state.cardsById]);

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const over = event.over;
    if (!over) return;
    const activeCardId = String(event.active.id);
    setState((s) => applyCardDrag(s, activeCardId, String(over.id)));
  }

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      data-testid="kanban-board"
    >
      <div className="border-b border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[var(--surface)]/90 px-6 py-5 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray)]">
          Workspace
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--navy)] md:text-3xl">
          Project board
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--gray)]">
          One board, five columns. Drag cards using the handle, rename columns,
          add or remove cards. Nothing is saved after refresh.
        </p>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-hidden px-4 py-6 md:px-6">
        <div className="flex min-w-min gap-4 pb-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={() => setActiveId(null)}
          >
            {state.columns.map((column) => (
              <ColumnPanel
                key={column.id}
                column={column}
                state={state}
                onRenameColumn={(columnId, title) =>
                  setState((s) => renameColumn(s, columnId, title))
                }
                onAddCard={(title, details) =>
                  setState((s) => addCard(s, column.id, title, details))
                }
                onDeleteCard={(cardId) =>
                  setState((s) => removeCard(s, cardId))
                }
              />
            ))}
            <DragOverlay dropAnimation={null}>
              {activeCard ? <CardPreview card={activeCard} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
