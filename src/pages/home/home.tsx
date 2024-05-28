import { Grid, Typography } from "@mui/material";
import {
  fetchBookList,
  selectBookListBooks,
  selectBookListLoading,
} from "entities/book/bookList";
import { BookPreview } from "entities/book/bookPreview";
import Steps from "features/step/ui/Step";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "shared/lib/store";
import { selectUser } from "shared/model/auth";

const HomePage = () => {
  const books = useAppSelector(selectBookListBooks);
  const loading = useAppSelector(selectBookListLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (user?.id)
      (async () => {
        try {
          await dispatch(fetchBookList({})).unwrap();
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
              key={book.book.id}
              book={book.book}
              actionSlot={<Steps id={book.book.id} status={book.status} />}
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

export default HomePage;
