import { IBookPreview, RejectedDataType } from "shared/types";

export interface IBookListState {
  readonly loading: boolean;
  readonly error: RejectedDataType | null;
  readonly books: BookData[] | null;
}

interface BookData {
  book: IBookPreview;
  status: number;
}

export interface IBooksResponse {
  isOk: true;
  message: string;
  data: BookData[];
}

export interface IBookResponse {
  isOk: true;
  message: string;
  data: BookData;
}
