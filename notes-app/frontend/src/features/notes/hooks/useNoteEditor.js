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
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState("default");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title ?? "");
      setContent(selectedNote.content ?? "");
      setTags(selectedNote.tags ?? []);
      setColor(selectedNote.color ?? "default");
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setColor("default");
    }
  }, [selectedNote]);

  const resetEditor = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setColor("default");
  };

  const saveNote = async () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      tags,
      color,
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
    tags,
    color,
    setTitle,
    setContent,
    setTags,
    setColor,
    saveNote,
    loading,
    selectedNote,
    resetEditor,
  };
}