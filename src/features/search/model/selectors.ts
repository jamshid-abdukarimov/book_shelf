import { createSelector } from "@reduxjs/toolkit";

import { ISearchState } from "./types";
import { RootState } from "app/store";

const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.search
);

export const selectSearchBooks = createSelector(
  selectBase,
  (state: ISearchState) => state.books
);
export const selectSearchLoading = createSelector(
  selectBase,
  (state: ISearchState) => state.loading
);
export const selectSearchError = createSelector(
  selectBase,
  (state: ISearchState) => state.error
);
