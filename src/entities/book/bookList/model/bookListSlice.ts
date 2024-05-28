import { createSlice } from "@reduxjs/toolkit";

import {
  addBookToList,
  deleteBookFromList,
  fetchBookList,
  updateBookFromList,
} from "./bookListThunk";
import { IBookListState } from "./types";

const initialState: IBookListState = {
  books: null,
  loading: false,
  error: null,
};

const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBookList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookList.fulfilled, (state, action) => {
        state.books = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBookList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(deleteBookFromList.fulfilled, (state, action) => {
        state.books = action.payload.data;
      })
      .addCase(updateBookFromList.fulfilled, (state, action) => {
        state.books = !state.books
          ? [action.payload.data]
          : state.books.map((book) => {
              if (book.book.id === action.payload.data.book.id) {
                return action.payload.data;
              }
              return book;
            });
      })
      .addCase(addBookToList.fulfilled, (state, action) => {
        const book = { book: action.payload.data, status: 0 };
        state.books = state.books ? [book, ...state.books] : [book];
      }),
});

export default bookListSlice.reducer;
