import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "./api/authApi";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ==========================
// Login
// ==========================
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed."
      );
    }
  }
);

// ==========================
// Register
// ==========================
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed."
      );
    }
  }
);

// ==========================
// Logout
// ==========================
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    resetAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Login
      // ==========================
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Register
      // ==========================
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Logout
      // ==========================
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuth, clearError } = authSlice.actions;

export default authSlice.reducer;