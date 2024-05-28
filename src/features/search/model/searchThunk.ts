import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { getResultsSearch, IResultsSearch } from "shared/api/search";
import { ErrorType, RejectedDataType } from "shared/types";

interface IFetchSearch {
  readonly searchSrc: string;
}

export const fetchSearch = createAsyncThunk<
  IResultsSearch,
  IFetchSearch,
  { readonly rejectValue: RejectedDataType }
>("books/fetchSearch", async ({ searchSrc }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await getResultsSearch(searchSrc, {
      key: state.auth.user?.key || "",
      secret: state.auth.user?.secret || "",
    });
    return response;
  } catch (err: unknown) {
    const knownError = err as ErrorType;

    return thunkAPI.rejectWithValue({
      messageError: knownError.message,
      status: knownError.response?.status,
    });
  }
});
