import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IBooksResponse, getBooks } from "shared/api/book";
import { addBook, deleteBook, updateBook } from "shared/api/book/book";
import { ErrorType, RejectedDataType } from "shared/types";
import { IBookResponse } from "./types";
import { IAddBookResponse } from "shared/api/book/types";

export const fetchBookList = createAsyncThunk<
  IBooksResponse,
  {},
  { readonly rejectValue: RejectedDataType }
>("books/fetchBookList", async ({}, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await getBooks({
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

export const deleteBookFromList = createAsyncThunk<
  IBooksResponse,
  { id: number },
  { readonly rejectValue: RejectedDataType }
>("books/deleteBook", async ({ id }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await deleteBook({
      id,
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

export const updateBookFromList = createAsyncThunk<
  IBookResponse,
  { id: number; status: number },
  { readonly rejectValue: RejectedDataType }
>("books/updateBook", async ({ id, status }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await updateBook({
      id,
      status,
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

export const addBookToList = createAsyncThunk<
  IAddBookResponse,
  { isbn: string },
  { readonly rejectValue: RejectedDataType }
>("books/addBook", async ({ isbn }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await addBook({
      isbn,
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
