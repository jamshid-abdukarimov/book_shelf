import { apiInstance } from "shared/api/base";

export const registerApi = async (credentials: {
  name: string;
  email: string;
  key: string;
  secret: string;
}) => {
  return await apiInstance.post("/signup", credentials);
};
