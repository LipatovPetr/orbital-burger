import { SERVER_API } from "../constants";
import { ServerResponse, SuccessTokensRefresh, apiOptions } from "./types";

import { SuccessAuthorizationResponse } from "../../store/slices/user/types";

export async function handleResponse<T extends ServerResponse>(
  res: Response
): Promise<T> {
  const jsonData: T = await res.json();
  if (!res.ok) {
    throw new Error(jsonData.message);
  }
  return jsonData;
}

export const fetchRequest = async (type: string, options?: object) => {
  const res = await fetch(`${SERVER_API + type}`, options);
  return res;
};

export const patchRequest = async (
  type: string,
  data: object,
  token: string
) => {
  const res = await fetch(`${SERVER_API + type}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const refreshToken = (type: string): Promise<SuccessTokensRefresh> => {
  return fetch(`${SERVER_API + type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => handleResponse<SuccessTokensRefresh>(res));
};

export const fetchWithRefresh = async (
  type: string,
  options: apiOptions
): Promise<SuccessAuthorizationResponse> => {
  try {
    const res = await fetch(`${SERVER_API + type}`, options);
    const jsonData = await handleResponse<SuccessAuthorizationResponse>(res);
    return jsonData;
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      console.log("Токен доступа устарел");
      const refreshData = await refreshToken("/auth/token");
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${SERVER_API + type}`, options);
      console.log("Токен обновлен,авторизация пройдена");
      return await handleResponse<SuccessAuthorizationResponse>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
