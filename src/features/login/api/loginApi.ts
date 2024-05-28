import { apiInstance } from "shared/api/base";
import generatorMd5 from "shared/utils/md5Generator";

export const loginApi = async (credentials: {
  key: string;
  secret: string;
}) => {
  const sign = generatorMd5({
    method: "GET",
    url: "/myself",
    body: "",
    secret: `${credentials.secret}`,
  });
  const response = await apiInstance.get("/myself", {
    headers: {
      key: credentials.key,
      sign: sign,
    },
  });

  return response;
};
