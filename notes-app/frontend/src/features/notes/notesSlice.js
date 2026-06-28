import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api/notesApi";

const initialState = {
  notes: [],
  selectedNote: null,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalNotes: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  },

  filters: {
    search: "",
    sort: "-createdAt",
  },

  loading: false,
  error: null,
};

// ===============================
// Fetch Notes
// ===============================

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",

  async (_, thunkAPI) => {
    try {
      const response = await getNotes();

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to fetch notes."
      );
    }
  }
);

// ===============================
// Create Note
// ===============================

export const addNote = createAsyncThunk(
  "notes/addNote",

  async (noteData, thunkAPI) => {
    try {
      const response = await createNote(noteData);

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to create note."
      );
    }
  }
);

// ===============================
// Update Note
// ===============================

export const editNote = createAsyncThunk(
  "notes/editNote",

  async ({ id, noteData }, thunkAPI) => {
    try {
      const response = await updateNote(id, noteData);

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to update note."
      );
    }
  }
);

// ===============================
// Delete Note
// ===============================

export const removeNote = createAsyncThunk(
  "notes/removeNote",

  async (id, thunkAPI) => {
    try {
      await deleteNote(id);

      return id;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to delete note."
      );
    }
  }
);

const notesSlice = createSlice({
  name: "notes",

  initialState,

  reducers: {
    selectNote(state, action) {
      state.selectedNote = action.payload;
    },

    createNewDraft(state) {
      state.selectedNote = {
        _id: null,
        title: "",
        content: "",
      };
    },

    clearSelectedNote(state) {
      state.selectedNote = null;
    },

    setSearch(state, action) {
      state.filters.search = action.payload;
    },

    setSort(state, action) {
      state.filters.sort = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch Notes
      // ===============================

      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.notes = action.payload.notes;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // Create Note
      // ===============================

      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.unshift(action.payload);
        state.selectedNote = action.payload;
        state.pagination.totalNotes += 1;
      })

      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // Update Note
      // ===============================

      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editNote.fulfilled, (state, action) => {
        state.loading = false;

        state.notes = state.notes.map((note) =>
          note._id === action.payload._id
            ? action.payload
            : note
        );

        if (
          state.selectedNote &&
          state.selectedNote._id === action.payload._id
        ) {
          state.selectedNote = action.payload;
        }
      })

      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // Delete Note
      // ===============================

      .addCase(removeNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeNote.fulfilled, (state, action) => {
        state.loading = false;

        state.notes = state.notes.filter(
          (note) => note._id !== action.payload
        );

        if (
          state.selectedNote &&
          state.selectedNote._id === action.payload
        ) {
          state.selectedNote = null;
        }

        state.pagination.totalNotes = Math.max(
          0,
          state.pagination.totalNotes - 1
        );
      })

      .addCase(removeNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectNote,
  createNewDraft,
  clearSelectedNote,
  setSearch,
  setSort,
  clearError,
} = notesSlice.actions;

export default notesSlice.reducer;