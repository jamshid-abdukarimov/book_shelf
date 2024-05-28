import { createSelector } from "@reduxjs/toolkit";

import { IBookListState } from "./types";
import { RootState } from "app/store";

const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.books
);

export const selectBookListBooks = createSelector(
  selectBase,
  (state: IBookListState) => state.books
);
export const selectBookListLoading = createSelector(
  selectBase,
  (state: IBookListState) => state.loading
);
export const selectBookListError = createSelector(
  selectBase,
  (state: IBookListState) => state.error
);
