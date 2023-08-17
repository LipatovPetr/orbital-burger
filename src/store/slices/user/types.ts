import { ServerResponse } from "../../../utils/api/types";

export interface UserState {
  user: undefined | UserEmailAndName;
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  editStatus: "idle" | "loading" | "succeeded" | "failed";
  logoutStatus: "idle" | "loading" | "succeeded" | "failed";
  authorizeStatus: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
  isAuthChecked: boolean;
}

export type UserAllFields = {
  name: string;
  email: string;
  password: string;
};

export type UserAllFieldsOptionals = Partial<UserAllFields>;

export type UserEmailAndName = Pick<UserAllFields, "email" | "name">;

export type UserEmailAndPassword = Pick<UserAllFields, "email" | "password">;

export type SuccessAuthorizationResponse = ServerResponse & {
  success: boolean;
  user: UserEmailAndName;
};

export type SuccessAuthorizationResponseWithTokens =
  SuccessAuthorizationResponse & {
    accessToken: string;
    refreshToken: string;
  };
