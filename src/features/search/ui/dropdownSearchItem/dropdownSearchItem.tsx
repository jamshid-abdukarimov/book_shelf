import React, { FC } from "react";
import defaultImage from "shared/assets/images/defaultImage.png";

import "./dropdownSearchItem.css";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch } from "shared/lib/store";
import { addBookToList } from "entities/book/bookList/model/bookListThunk";

interface IDropdownSearchItem {
  readonly cover?: string;
  readonly title: string;
  readonly author: string;
  readonly published: number;
  readonly isbn: string;
}

export const DropdownSearchItem: FC<IDropdownSearchItem> = (props) => {
  const { cover = defaultImage, title, author, isbn } = props;
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
      <div className="dropdown-search-item">
        <img
          src={cover}
          className="dropdown-search-item__image"
          alt="Book cover."
        />
        <div className="dropdown-search-item__content-wrapper">
          <h1 className="dropdown-search-item__title">{title}</h1>
          <h2 className="dropdown-search-item__subtitle">{author}</h2>
          <Button
            startIcon={loading ? <CircularProgress size={10} /> : null}
            disabled={loading}
            onClick={handleAddBook}
            type="button"
            variant="contained"
            style={{ padding: 0 }}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
