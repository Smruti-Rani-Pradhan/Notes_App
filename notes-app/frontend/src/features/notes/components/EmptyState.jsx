import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">

      <div className="rounded-full bg-blue-100 p-5">
        <FileText
          size={42}
          className="text-blue-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        No Notes Found
      </h2>

      <p className="mt-2 max-w-sm text-slate-500">
        Click <strong>New Note</strong> to create your
        first note and start organizing your ideas.
      </p>

    </div>
  );
}