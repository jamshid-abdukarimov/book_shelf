import { IBookPreview } from "shared/types";

interface BookData {
  book: IBookPreview;
  status: number;
}

export interface IBooksResponse {
  isOk: true;
  message: string;
  data: BookData[];
}

export interface IAddBookResponse {
  isOk: true;
  message: string;
  data: IBookPreview;
}
