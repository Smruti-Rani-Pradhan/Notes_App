import { useState } from "react";

import useNoteEditor from "../hooks/useNoteEditor";
import useNotes from "../hooks/useNotes";

import NoteEditorForm from "./NoteEditorForm";
import DeleteDialog from "./DeleteDialog";

export default function NoteEditor() {
  const {
    title,
    content,
    setTitle,
    setContent,
    saveNote,
    loading,
    selectedNote,
  } = useNoteEditor();

  const { removeNote } = useNotes();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedNote?._id) return;

    try {
      await removeNote(selectedNote._id).unwrap();

      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedNote) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">

        <div className="mb-6 text-7xl">
          📝
        </div>

        <h2 className="text-2xl font-semibold text-slate-700">
          No Note Selected
        </h2>

        <p className="mt-3 max-w-md text-slate-500">
          Select a note from the left panel or click
          <span className="font-semibold"> New Note </span>
          to start writing.
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
        setTitle={setTitle}
        setContent={setContent}
        loading={loading}
        onSave={saveNote}
        onDelete={() => setDeleteOpen(true)}
        isExisting={Boolean(selectedNote._id)}
        updatedAt={selectedNote.updatedAt}
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