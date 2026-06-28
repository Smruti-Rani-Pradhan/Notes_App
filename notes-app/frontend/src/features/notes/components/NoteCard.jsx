import { Card } from "@/components/ui/card";

import useNotes from "../hooks/useNotes";

export default function NoteCard({
    note,
}) {

    const {
        selectedNote,
        selectNote,
    } = useNotes();

    const active =
        selectedNote?._id === note._id;

    return (
        <Card
            onClick={() => selectNote(note)}
            className={`cursor-pointer rounded-xl border p-4 transition hover:shadow-md ${active
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
        >

            <h3 className="truncate text-lg font-semibold">

                {note.title}

            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-slate-500">

                {note.content}

            </p>

            <p className="mt-4 text-xs text-slate-400">

                Updated{" "}
                {new Date(note.updatedAt).toLocaleString()}

            </p>

        </Card>
    );
}