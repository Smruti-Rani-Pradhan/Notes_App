import useNotes from "../hooks/useNotes";

import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";
import NotesSkeleton from "./NotesSkeleton";

export default function NotesList() {
  const {
    notes,
    loading,
    filters,
    createDraft,
  } = useNotes();

  if (loading) {
    return <NotesSkeleton />;
  }

  if (!notes.length) {
    return (
      <EmptyState
        view={filters.view}
        hasSearch={Boolean(filters.search.trim())}
        onCreate={createDraft}
      />
    );
  }

  return (
    <div className="h-full space-y-3 overflow-y-auto pr-1">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
        />
      ))}
    </div>
  );
}
