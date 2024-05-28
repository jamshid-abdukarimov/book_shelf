import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BookListReducer } from "entities/book/bookList";
import { searchReducer } from "features/search";
import { authReducer } from "shared/model/auth";

const rootReducer = combineReducers({
  search: searchReducer,
  auth: authReducer,
  books: BookListReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
