import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotes,
  addNote,
  editNote,
  favoriteNote,
  removeNote,
  restoreRemovedNote,
  destroyNote,
  selectNote,
  createNewDraft,
  clearSelectedNote,
  setSearch,
  setSort,
  setView,
  setTag,
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

  const toggleFavorite = useCallback(
    (id, isFavorite) =>
      dispatch(
        favoriteNote({
          id,
          isFavorite,
        })
      ),
    [dispatch]
  );

  const restoreNote = useCallback(
    (id) => dispatch(restoreRemovedNote(id)),
    [dispatch]
  );

  const permanentlyDeleteNote = useCallback(
    (id) => dispatch(destroyNote(id)),
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

  const changeView = useCallback(
    (value) => dispatch(setView(value)),
    [dispatch]
  );

  const changeTag = useCallback(
    (value) => dispatch(setTag(value)),
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
    addNote: createNote,
    updateNote,
    editNote: updateNote,
    deleteNote,
    removeNote: deleteNote,
    toggleFavorite,
    restoreNote,
    permanentlyDeleteNote,
    openNote,
    selectNote: openNote,
    createDraft,
    clearSelection,
    searchNotes,
    sortNotes,
    changeView,
    changeTag,
  };
}
