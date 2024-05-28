import { Grid, Typography } from "@mui/material";
import { BookPreview } from "entities/book/bookPreview";
import { AddBookButton } from "features/book";
import {
  fetchSearch,
  selectSearchBooks,
  selectSearchLoading,
} from "features/search";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/lib/store";
import { selectUser } from "shared/model/auth";

const SearchPage = () => {
  const books = useAppSelector(selectSearchBooks);
  const loading = useAppSelector(selectSearchLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const params = useParams();

  React.useEffect(() => {
    if (user?.id && params.searchLine)
      (async () => {
        try {
          dispatch(
            fetchSearch({ searchSrc: params.searchLine || "" })
          ).unwrap();
        } catch (error) {
          console.log(error);
        }
      })();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <FallingLines color="#00BFFF" width="100" visible={true} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px", marginBottom: "20px" }}>
      <Grid padding="0 15px" container spacing={2}>
        {books && books.length ? (
          books?.map((book) => (
            <BookPreview
              key={book.isbn}
              book={book}
              actionSlot={<AddBookButton isbn={book.isbn} />}
              isDeletable={true}
            />
          ))
        ) : (
          <Typography
            variant="h4"
            textAlign="center"
            marginTop={3}
            width="100%"
            color="primary.main"
          >
            No Books. Please, Initially add a new book.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default SearchPage;
