import { useMemo } from "react";

import useNotes from "../hooks/useNotes";

import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";
import NotesSkeleton from "./NotesSkeleton";

export default function NotesList() {
  const {
    notes,
    loading,
    filters,
  } = useNotes();

  const filteredNotes = useMemo(() => {
    const keyword = filters.search
      .trim()
      .toLowerCase();

    let result = [...notes];

    if (keyword) {
      result = result.filter((note) => {
        const title = note.title?.toLowerCase() || "";
        const content = note.content?.toLowerCase() || "";

        return (
          title.includes(keyword) ||
          content.includes(keyword)
        );
      });
    }

    switch (filters.sort) {
      case "createdAt":
        result.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "title":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "-title":
        result.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      case "-createdAt":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return result;
  }, [notes, filters]);

  if (loading) {
    return <NotesSkeleton />;
  }

  if (!filteredNotes.length) {
    return <EmptyState />;
  }

  return (
    <div className="h-full space-y-3 overflow-y-auto pr-1">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
        />
      ))}
    </div>
  );
}