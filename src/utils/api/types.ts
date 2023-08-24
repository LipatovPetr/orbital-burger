import { SuccessAuthorizationResponseWithTokens } from "../../store/slices/user/types";

export type ServerResponse = {
  message: string;
};

export type SuccessTokensRefresh = Omit<
  SuccessAuthorizationResponseWithTokens,
  "user"
>;

export type optionsHeader = {
  "Content-Type": "application/json";
  authorization: string;
};

export type apiOptions = {
  method: "GET";
  headers: optionsHeader;
};

// {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     authorization: token,
//   },
