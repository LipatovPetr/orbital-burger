import { createAction } from "@reduxjs/toolkit";

export const connectProfile = createAction<string>("feed/profile/connect");

export const disconnectProfile = createAction("feed/profile/disconnect");

export const wsConnectingProfile = createAction("feed/profile/ws/connecting");

export const wsOpenProfile = createAction("feed/profile/ws/open");

export const wsCloseProfile = createAction("feed/profile/ws/close");

export const wsMessageProfile = createAction<unknown>(
  "feed/profile/ws/message"
);

export const wsErrorProfile = createAction<string>("feed/profile/ws/error");
