import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ onCreate }) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">

      <div className="rounded-full bg-blue-100 p-5">
        <FileText
          size={42}
          className="text-blue-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-800">
        No Notes Yet
      </h2>

      <p className="mt-2 max-w-sm text-slate-500">
        Create your first note to start organizing your ideas,
        tasks, and important information.
      </p>

      <Button
        className="mt-8"
        onClick={onCreate}
      >
        Create First Note
      </Button>

    </div>
  );
}