export interface IBookPreview {
  readonly id: number;
  readonly isbn: string;
  readonly cover?: string;
  readonly author: string;
  readonly title: string;
  readonly published: number;
  readonly pages: number;
}
