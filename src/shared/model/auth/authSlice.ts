import { createSlice } from "@reduxjs/toolkit";

import { IAuthState } from "./types";
import { login } from "features/login/model/authThunk";
import { register } from "features/register/model/authThunk";

const initialState: IAuthState = {
  isAuth: false,
  loading: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.user = null;
        state.isAuth = false;
      }),
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
