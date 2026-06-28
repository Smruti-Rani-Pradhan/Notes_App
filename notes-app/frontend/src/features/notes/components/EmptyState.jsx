import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      <FileText
        size={64}
        className="text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        No Notes Yet
      </h2>

      <p className="mt-2 text-slate-500">
        Click "New Note" to create your first note.
      </p>

    </div>
  );
}