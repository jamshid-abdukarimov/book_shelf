import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorType, RejectedDataType } from "shared/types";
import { loginApi } from "../api/loginApi";
import { IAuthResponse } from "shared/model/auth/types";
export const login = createAsyncThunk<
  IAuthResponse,
  { readonly key: string; readonly secret: string },
  { readonly rejectValue: RejectedDataType }
>("auth/login", async ({ key, secret }, thunkAPI) => {
  try {
    const response = (await loginApi({ key, secret })) as IAuthResponse;
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
