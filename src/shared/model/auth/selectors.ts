import { createSelector } from "@reduxjs/toolkit";

import { IAuthState } from "./types";
import { RootState } from "app/store";

const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);

export const selectUser = createSelector(
  selectBase,
  (state: IAuthState) => state.user
);
export const selectUserLoading = createSelector(
  selectBase,
  (state: IAuthState) => state.loading
);
export const selectUserError = createSelector(
  selectBase,
  (state: IAuthState) => state.error
);
