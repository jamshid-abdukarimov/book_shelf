export interface IResultsSearch {
  readonly data: IBook[];
  readonly isOk: string;
  readonly message: string;
}

export interface IBook {
  readonly author: string;
  readonly cover: string;
  readonly isbn: string;
  readonly published: number;
  readonly title: string;
}
