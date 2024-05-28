import generatorMd5 from "shared/utils/md5Generator";
import { apiInstance } from "../base";

import { IResultsSearch } from "./types";

const BASE_URL = "books";

export const getResultsSearch = (
  searchStr: string,
  { key, secret }: { key: string; secret: string }
): Promise<IResultsSearch> => {
  const sign = generatorMd5({
    method: "GET",
    url: `/books/${searchStr}`,
    body: "",
    secret,
  });

  return apiInstance.get(`${BASE_URL}/${searchStr}`, {
    headers: {
      Key: key,
      Sign: sign,
    },
  });
};
