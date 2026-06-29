import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfileApi,
  changePasswordApi,
  refreshAccessToken,
  getCurrentUser,
} from "./api/authApi";

let savedToken = null;
let savedUser = null;
try {
  savedToken = sessionStorage.getItem("accessToken");
  savedUser = JSON.parse(sessionStorage.getItem("user"));
} catch (e) {}

const initialState = {
  user: savedUser || null,
  accessToken: savedToken || null,
  isAuthenticated: !!savedToken,
  loading: false,
  initialized: !!savedToken,
  error: null,
};

// ==========================
// Check Session (Silent Refresh)
// ==========================
export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    try {
      const refreshResponse = await refreshAccessToken();
      const refreshData = refreshResponse.data || refreshResponse;
      const token = refreshData.accessToken;
      
      if (!token) throw new Error("No token returned");
      
      sessionStorage.setItem("accessToken", token);
      
      const userResponse = await getCurrentUser();
      const userData = userResponse.data || userResponse;
      
      return { token, user: userData };
    } catch (error) {
      try {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
      } catch (e) {}
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

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

// ==========================
// Update Profile
// ==========================
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await updateProfileApi(profileData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  }
);

// ==========================
// Change Password
// ==========================
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await changePasswordApi(passwordData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change password."
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
        // API returns wrapper { success, statusCode, message, data }
        const payload = action.payload?.data || action.payload || {};
        state.user = payload.user || null;
        state.accessToken = payload.accessToken || null;
        state.isAuthenticated = !!payload.accessToken;
        state.initialized = true;
        try {
          if (payload.accessToken) {
            sessionStorage.setItem("accessToken", payload.accessToken);
          }
          if (payload.user) {
            sessionStorage.setItem("user", JSON.stringify(payload.user));
          }
        } catch (e) {}
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
        try {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("user");
        } catch (e) {}
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // ==========================
      // Update Profile
      // ==========================
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload || {};
        state.user = payload;
        state.error = null;
        try {
          sessionStorage.setItem("user", JSON.stringify(payload));
        } catch (e) {}
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Change Password
      // ==========================
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Check Session
      // ==========================
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.initialized = true;
        try {
          sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        } catch (e) {}
      })
      .addCase(checkSession.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.initialized = true;
      });
  },
});

export const { resetAuth, clearError } = authSlice.actions;

export default authSlice.reducer;