import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    return new Promise((resolve) => {
        if (email === "admin@test.com" && password === "123") {
          resolve({ email });
          localStorage.setItem("auth", true);
        } else {
          alert("Invalid credentials");
        }
    });
  }
);
