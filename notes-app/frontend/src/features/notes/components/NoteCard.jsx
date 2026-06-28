import { Card } from "@/components/ui/card";

export default function NoteCard({ note }) {
  return (
    <Card className="cursor-pointer rounded-xl p-4 transition-all hover:shadow-lg hover:border-blue-500">

      <h3 className="font-semibold text-lg line-clamp-1">
        {note.title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {note.content}
      </p>

      <p className="mt-4 text-xs text-gray-400">
        {note.updatedAt}
      </p>

    </Card>
  );
}