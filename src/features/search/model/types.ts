import { IBook } from "shared/api/search/types";
import { RejectedDataType } from "shared/types";

export interface ISearchState {
  readonly books: IBook[] | null;
  readonly loading: boolean;
  readonly error: RejectedDataType | null;
}
