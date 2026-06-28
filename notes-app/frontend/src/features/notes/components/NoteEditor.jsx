import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import useNoteEditor from "../hooks/useNoteEditor";
import useNotes from "../hooks/useNotes";

import NoteEditorForm from "./NoteEditorForm";
import DeleteDialog from "./DeleteDialog";

export default function NoteEditor() {
  const {
    title,
    content,
    tags,
    color,
    setTitle,
    setContent,
    setTags,
    setColor,
    saveNote,
    loading,
    selectedNote,
  } = useNoteEditor();

  const {
    removeNote,
    toggleFavorite,
    restoreNote,
    permanentlyDeleteNote,
    filters,
    clearSelection,
  } = useNotes();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedNote?._id) return;

    try {
      await removeNote(selectedNote._id).unwrap();

      setDeleteOpen(false);
      toast.success("Note moved to trash.");
    } catch (error) {
      toast.error(error || "Unable to delete note.");
    }
  };

  const handleFavorite = async () => {
    if (!selectedNote?._id) return;

    try {
      await toggleFavorite(
        selectedNote._id,
        !selectedNote.isFavorite
      ).unwrap();
    } catch (error) {
      toast.error(error || "Unable to update favorite.");
    }
  };

  const handleRestore = async () => {
    if (!selectedNote?._id) return;

    try {
      await restoreNote(selectedNote._id).unwrap();
      toast.success("Note restored.");
    } catch (error) {
      toast.error(error || "Unable to restore note.");
    }
  };

  const handlePermanentDelete = async () => {
    if (!selectedNote?._id) return;

    try {
      await permanentlyDeleteNote(selectedNote._id).unwrap();
      toast.success("Note permanently deleted.");
    } catch (error) {
      toast.error(error || "Unable to permanently delete note.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveNote();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveNote]);

  if (!selectedNote) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-muted/20 p-8 text-center">

        <div className="mb-6 flex size-20 items-center justify-center rounded-lg bg-background shadow-sm">
          <FileText className="size-10 text-muted-foreground" />
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          {filters.view === "trash"
            ? "Select a Deleted Note"
            : "No Note Selected"}
        </h2>

        <p className="mt-3 max-w-md text-muted-foreground">
          {filters.view === "trash"
            ? "Choose a deleted note to restore it or remove it permanently."
            : "Select a note from the list or create a new one to start writing."}
        </p>

      </div>
    );
  }

  return (
    <>
      <NoteEditorForm
        key={selectedNote._id ?? "draft"}
        title={title}
        content={content}
        tags={tags}
        color={color}
        setTitle={setTitle}
        setContent={setContent}
        setTags={setTags}
        setColor={setColor}
        loading={loading}
        onSave={saveNote}
        onDelete={() => setDeleteOpen(true)}
        onFavorite={handleFavorite}
        onRestore={handleRestore}
        onPermanentDelete={handlePermanentDelete}
        onBack={clearSelection}
        isExisting={Boolean(selectedNote._id)}
        isFavorite={Boolean(selectedNote.isFavorite)}
        isTrash={filters.view === "trash" || Boolean(selectedNote.deletedAt)}
        updatedAt={selectedNote.deletedAt || selectedNote.updatedAt}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}
