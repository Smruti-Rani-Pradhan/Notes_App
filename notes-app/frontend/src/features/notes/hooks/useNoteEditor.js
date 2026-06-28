import { useEffect, useState } from "react";
import { toast } from "sonner";

import useNotes from "./useNotes";

export default function useNoteEditor() {
  const {
    selectedNote,
    addNote,
    editNote,
    loading,
  } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title ?? "");
      setContent(selectedNote.content ?? "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  const resetEditor = () => {
    setTitle("");
    setContent("");
  };

  const saveNote = async () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
    };

    try {
      // Update Existing Note
      if (selectedNote?._id) {
        await editNote(
          selectedNote._id,
          noteData
        ).unwrap();

        toast.success("Note updated successfully.");

        return;
      }

      // Create New Note
      const createdNote = await addNote(noteData).unwrap();

      toast.success("Note created successfully.");

      resetEditor();

      return createdNote;

    } catch (error) {
      toast.error(
        error || "Something went wrong."
      );
    }
  };

  return {
    title,
    content,
    setTitle,
    setContent,
    saveNote,
    loading,
    selectedNote,
    resetEditor,
  };
}