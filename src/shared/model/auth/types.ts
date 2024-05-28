import { RejectedDataType } from "shared/types";

export interface IAuthState {
  isAuth: boolean;
  readonly loading: boolean;
  readonly error: RejectedDataType | null;
  readonly user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly key: string;
    readonly secret: string;
  } | null;
}

export interface IAuthResponse {
  isOk: true;
  message: string;
  data: {
    email: string;
    name: string;
    id: number;
    key: string;
    secret: string;
  };
}
