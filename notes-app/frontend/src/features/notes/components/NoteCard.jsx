import { Star, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";

import useNotes from "../hooks/useNotes";

export default function NoteCard({
    note,
}) {

    const {
        selectedNote,
        selectNote,
        filters,
    } = useNotes();

    const active =
        selectedNote?._id === note._id;

    return (
        <Card
            onClick={() => selectNote(note)}
            className={`cursor-pointer rounded-lg border p-4 transition hover:border-foreground/20 hover:shadow-sm ${active
                    ? "border-foreground bg-muted"
                    : ""
                }`}
        >

            <div className="flex items-start justify-between gap-3">
                <h3 className="truncate text-base font-semibold">

                    {note.title}

                </h3>

                {filters.view === "trash" ? (
                    <Trash2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                ) : note.isFavorite ? (
                    <Star className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-500" />
                ) : null}
            </div>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">

                {note.content || "No additional content."}

            </p>

            <p className="mt-4 text-xs text-muted-foreground">

                {filters.view === "trash" ? "Deleted" : "Updated"}{" "}
                {new Date(note.deletedAt || note.updatedAt).toLocaleString()}

            </p>

        </Card>
    );
}
