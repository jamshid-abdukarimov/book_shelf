import * as React from "react";
import { useAppDispatch } from "shared/lib/store";
import { Button, CircularProgress } from "@mui/material";
import { addBookToList } from "entities/book/bookList/model/bookListThunk";

interface Props {
  isbn: string;
}

export default function AddBookButton({ isbn }: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleAddBook = async () => {
    try {
      setLoading(true);
      await dispatch(addBookToList({ isbn })).unwrap();
      alert("Book added successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        style={{ margin: 20 }}
        disabled={loading}
        onClick={handleAddBook}
        variant="contained"
        className="create-btn"
      >
        Add a Book
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <img
            style={{ width: 30, marginLeft: 10 }}
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/medical-book-2126431-1790681.png"
            alt="add_book"
          />
        )}
      </Button>
    </>
  );
}
