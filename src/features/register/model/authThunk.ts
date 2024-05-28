import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorType, RejectedDataType } from "shared/types";
import { IAuthResponse } from "shared/model/auth/types";
import { registerApi } from "../api/registerApi";
export const register = createAsyncThunk<
  IAuthResponse,
  {
    readonly key: string;
    readonly secret: string;
    readonly name: string;
    readonly email: string;
  },
  { readonly rejectValue: RejectedDataType }
>("auth/register", async ({ key, secret, name, email }, thunkAPI) => {
  try {
    const response = (await registerApi({
      key,
      secret,
      name,
      email,
    })) as IAuthResponse;
    localStorage.setItem("userData", JSON.stringify(response.data));
    return response;
  } catch (err: unknown) {
    const knownError = err as ErrorType;
    return thunkAPI.rejectWithValue({
      messageError: knownError.message,
      status: knownError.response?.status,
    } as RejectedDataType);
  }
});
