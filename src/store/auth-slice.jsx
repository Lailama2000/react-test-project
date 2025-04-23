import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./auth-thunks";

const savedUser = localStorage.getItem("auth");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("auth")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
