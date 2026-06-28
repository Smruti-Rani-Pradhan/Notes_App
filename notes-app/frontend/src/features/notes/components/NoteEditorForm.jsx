import { Save, Trash2, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NoteEditorForm({
  title,
  content,
  setTitle,
  setContent,
  loading,
  onSave,
  onDelete,
  isExisting,
  updatedAt,
}) {
  return (
    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-8 py-5">

        <div>

          <h2 className="text-xl font-semibold text-slate-800">
            {isExisting ? "Edit Note" : "New Note"}
          </h2>

          {updatedAt && (
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Clock size={14} />
              <span>
                Updated{" "}
                {new Date(updatedAt).toLocaleString()}
              </span>
            </div>
          )}

        </div>

        <div className="flex items-center gap-3">

          {isExisting && (
            <Button
              variant="destructive"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}

          <Button
            onClick={onSave}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />

            {loading ? "Saving..." : "Save"}
          </Button>

        </div>

      </div>

      {/* Editor */}

      <div className="flex flex-1 flex-col p-8">

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          className="border-none px-0 text-3xl font-bold shadow-none focus-visible:ring-0"
        />

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="mt-6 flex-1 resize-none border-none px-0 text-base leading-7 shadow-none focus-visible:ring-0"
        />

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t px-8 py-4 text-sm text-slate-500">

        <span>
          Ctrl + S to save
        </span>

        <span>
          {title.length} characters
        </span>

      </div>

    </div>
  );
}