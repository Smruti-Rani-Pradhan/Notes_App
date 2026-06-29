import { Star, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import useNotes from "../hooks/useNotes";
import { NOTE_COLORS } from "@/lib/colors";

export default function NoteCard({ note }) {
  const { selectedNote, selectNote, filters } = useNotes();
  const active = selectedNote?._id === note._id;
  
  const colorScheme = NOTE_COLORS[note.color] || NOTE_COLORS.default;

  return (
    <Card
      onClick={() => selectNote(note)}
      className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
        active 
          ? "ring-2 ring-primary/80 border-transparent shadow-lg scale-[1.01]" 
          : "hover:border-foreground/20"
      } ${colorScheme.cardBg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate text-base font-semibold tracking-tight">
          {note.title || "Untitled Note"}
        </h3>

        {filters.view === "trash" ? (
          <Trash2 className="mt-0.5 size-4 shrink-0 text-muted-foreground/75" />
        ) : note.isFavorite ? (
          <Star className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-500 animate-pulse" />
        ) : null}
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground/90 font-medium">
        {note.content 
          ? note.content
              .replace(/\*\*([^*]+)\*\*/g, "$1")
              .replace(/__([^_]+)__/g, "$1")
              .replace(/\*([^*]+)\*/g, "$1")
              .replace(/_([^_]+)_/g, "$1")
              .replace(/`([^`]+)`/g, "$1")
              .replace(/#+\s+/g, "")
              .replace(/- \[[x ]\]\s+/g, "")
              .replace(/-\s+/g, "")
              .replace(/\*\s+/g, "")
          : "No additional content."}
      </p>

      {/* Tags List */}
      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-muted/10 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/75">
        <span>
          {filters.view === "trash" ? "Deleted" : "Updated"}
        </span>
        <span>
          {new Date(note.deletedAt || note.updatedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </Card>
  );
}
