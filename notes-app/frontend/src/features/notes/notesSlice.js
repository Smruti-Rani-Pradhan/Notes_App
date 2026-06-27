import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getNotes,
} from "./api/notesApi";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",

  async (_, thunkAPI) => {
    try {
      const response = await getNotes();

      return response.data.notes;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to fetch notes."
      );

    }
  }
);

const notesSlice = createSlice({
  name: "notes",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchNotes.pending, (state) => {

        state.loading = true;

      })

      .addCase(fetchNotes.fulfilled, (state, action) => {

        state.loading = false;

        state.notes = action.payload;

      })

      .addCase(fetchNotes.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });

  },
});

export default notesSlice.reducer;