import { Save, Trash2, Clock, Star, RotateCcw } from "lucide-react";

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
  onFavorite,
  onRestore,
  onPermanentDelete,
  isExisting,
  isFavorite,
  isTrash,
  updatedAt,
}) {
  return (
    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">

        <div>

          <h2 className="text-xl font-semibold text-foreground">
            {isTrash ? "Deleted Note" : isExisting ? "Edit Note" : "New Note"}
          </h2>

          {updatedAt && (
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={14} />
              <span>
                {isTrash ? "Deleted" : "Updated"}{" "}
                {new Date(updatedAt).toLocaleString()}
              </span>
            </div>
          )}

        </div>

        <div className="flex items-center gap-3">

          {isTrash ? (
            <>
              <Button
                variant="outline"
                onClick={onRestore}
                disabled={loading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore
              </Button>

              <Button
                variant="destructive"
                onClick={onPermanentDelete}
                disabled={loading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Forever
              </Button>
            </>
          ) : (
            <>
              {isExisting && (
                <Button
                  variant="outline"
                  onClick={onFavorite}
                  disabled={loading}
                >
                  <Star
                    className={`mr-2 h-4 w-4 ${
                      isFavorite ? "fill-amber-400 text-amber-500" : ""
                    }`}
                  />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>
              )}

              {isExisting && (
                <Button
                  variant="destructive"
                  onClick={onDelete}
                  disabled={loading}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Move to Trash
                </Button>
              )}

            <Button
              onClick={onSave}
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />

              {loading ? "Saving..." : "Save"}
            </Button>
            </>
          )}

        </div>

      </div>

      {/* Editor */}

      <div className="flex flex-1 flex-col p-5 lg:p-8">

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          disabled={isTrash}
          className="h-auto border-none px-0 text-3xl font-bold shadow-none focus-visible:ring-0"
        />

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          disabled={isTrash}
          className="mt-6 flex-1 resize-none border-none px-0 text-base leading-7 shadow-none focus-visible:ring-0"
        />

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t px-5 py-4 text-sm text-muted-foreground lg:px-8">

        <span>
          {isTrash ? "Restore to edit again" : "Ctrl + S to save"}
        </span>

        <span>
          {content.length} characters
        </span>

      </div>

    </div>
  );
}
