import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import "./bookPreview.css";
import { IBookPreview } from "shared/types/bookTypes";
import { useAppDispatch } from "shared/lib/store";
import { deleteBookFromList } from "entities/book/bookList";
import { IBook } from "shared/api/search/types";

const BookPreview = ({
  book,
  actionSlot,
  isDeletable = true,
}: {
  book: IBookPreview | IBook;
  actionSlot: any;
  isDeletable?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await dispatch(
          deleteBookFromList({ id: (book as IBookPreview).id })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid className="book_item " item sm={12} md={6}>
      {isDeletable && (
        <Button onClick={handleDelete} className="book_item-delete_btn">
          <DeleteSweepIcon />
        </Button>
      )}
      <Card sx={{ display: "flex" }} className="book_item-card">
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            width: "30%",
            minWidth: 160,
            maxWidth: 180,
            objectFit: "cover",
          }}
          image={
            book.cover ||
            "https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png"
          }
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography
              component="div"
              variant="h6"
              className="book_item-card_title"
            >
              {book.title || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>Author: </b> {book.author || ""}
            </Typography>
            {!!(book as IBookPreview).pages && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <b>Pages: </b> {(book as IBookPreview).pages}
              </Typography>
            )}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>ISBN: </b> {book.isbn || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>Published: </b> {book.published || ""}
            </Typography>
          </CardContent>
          {actionSlot}
        </Box>
      </Card>
    </Grid>
  );
};

export default BookPreview;
