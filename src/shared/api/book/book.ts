import generatorMd5 from "shared/utils/md5Generator";
import { apiInstance } from "../base";
import { IAddBookResponse, IBooksResponse } from "./types";
import { IBookResponse } from "entities/book/bookList/model/types";

const BASE_URL = "books";

export const getBooks = ({
  key,
  secret,
}: {
  key: string;
  secret: string;
}): Promise<IBooksResponse> => {
  const sign = generatorMd5({
    method: "GET",
    url: `/books`,
    body: "",
    secret,
  });

  return apiInstance.get(`${BASE_URL}`, {
    headers: {
      Key: key,
      Sign: sign,
    },
  });
};

export const deleteBook = ({
  id,
  key,
  secret,
}: {
  id: number;
  key: string;
  secret: string;
}): Promise<IBooksResponse> => {
  const sign = generatorMd5({
    method: "DELETE",
    url: `/books/${id}`,
    body: "",
    secret,
  });

  return apiInstance.delete(`${BASE_URL}/${id}`, {
    headers: {
      Key: key,
      Sign: sign,
    },
  });
};

export const updateBook = ({
  id,
  key,
  secret,
  status,
}: {
  id: number;
  status: number;
  key: string;
  secret: string;
}): Promise<IBookResponse> => {
  const sign = generatorMd5({
    method: "PATCH",
    url: `/books/${id}`,
    body: JSON.stringify({ status: status }),
    secret,
  });

  return apiInstance.patch(
    `${BASE_URL}/${id}`,
    { status },
    {
      headers: {
        Key: key,
        Sign: sign,
      },
    }
  );
};

export const addBook = ({
  key,
  secret,
  isbn,
}: {
  isbn: string;
  key: string;
  secret: string;
}): Promise<IAddBookResponse> => {
  const sign = generatorMd5({
    method: "POST",
    url: `/books`,
    body: JSON.stringify({ isbn }),
    secret,
  });

  return apiInstance.post(
    `${BASE_URL}`,
    { isbn },
    {
      headers: {
        Key: key,
        Sign: sign,
      },
    }
  );
};
