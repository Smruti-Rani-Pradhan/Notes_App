import { Card } from "@/components/ui/card";

export default function NoteCard({ note, active = false }) {
  return (
    <Card
      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${
        active
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <h3 className="truncate text-lg font-semibold text-slate-800">
        {note.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {note.content}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {note.updatedAt}
        </span>
      </div>
    </Card>
  );
}