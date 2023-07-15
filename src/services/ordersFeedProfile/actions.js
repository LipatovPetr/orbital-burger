import { createAction } from "@reduxjs/toolkit";

export const connectProfile = createAction("feed/profile/connect");

export const disconnectProfile = createAction("feed/profile/disconnect");

export const wsConnectingProfile = createAction("feed/profile/ws/connecting");

export const wsOpenProfile = createAction("feed/profile/ws/open");

export const wsCloseProfile = createAction("feed/profile/ws/close");

export const wsMessageProfile = createAction("feed/profile/ws/message");

export const wsErrorProfile = createAction("feed/profile/ws/error");
