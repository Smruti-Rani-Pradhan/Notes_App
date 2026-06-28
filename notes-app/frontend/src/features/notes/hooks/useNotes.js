import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotes,
  addNote,
  editNote,
  removeNote,
  selectNote,
  createNewDraft,
  clearSelectedNote,
  setSearch,
  setSort,
} from "../notesSlice";

export default function useNotes() {
  const dispatch = useDispatch();

  const {
    notes,
    selectedNote,
    pagination,
    filters,
    loading,
    error,
  } = useSelector((state) => state.notes);

  // =============================
  // Fetch Notes
  // =============================

  const loadNotes = useCallback(() => {
    return dispatch(fetchNotes());
  }, [dispatch]);

  // =============================
  // Create Note
  // =============================

  const createNote = useCallback(
    (noteData) => dispatch(addNote(noteData)),
    [dispatch]
  );

  // =============================
  // Update Note
  // =============================

  const updateNote = useCallback(
    (id, noteData) =>
      dispatch(
        editNote({
          id,
          noteData,
        })
      ),
    [dispatch]
  );

  // =============================
  // Delete Note
  // =============================

  const deleteNote = useCallback(
    (id) => dispatch(removeNote(id)),
    [dispatch]
  );

  // =============================
  // Selection
  // =============================

  const openNote = useCallback(
    (note) => dispatch(selectNote(note)),
    [dispatch]
  );

  const createDraft = useCallback(
    () => dispatch(createNewDraft()),
    [dispatch]
  );

  const clearSelection = useCallback(
    () => dispatch(clearSelectedNote()),
    [dispatch]
  );

  // =============================
  // Filters
  // =============================

  const searchNotes = useCallback(
    (value) => dispatch(setSearch(value)),
    [dispatch]
  );

  const sortNotes = useCallback(
    (value) => dispatch(setSort(value)),
    [dispatch]
  );

  return {
    // State
    notes,
    selectedNote,
    pagination,
    filters,
    loading,
    error,

    // Actions
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    openNote,
    createDraft,
    clearSelection,
    searchNotes,
    sortNotes,
  };
}