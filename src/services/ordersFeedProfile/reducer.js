import { createReducer } from "@reduxjs/toolkit";
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from "./actions";

const initialState = {
  status: "offline",
  orders: [],
  connectionError: "",
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingProfile, (state) => {
      state.status = "connecting...";
    })
    .addCase(wsOpenProfile, (state) => {
      state.status = "online";
      state.connectionError = "";
    })
    .addCase(wsCloseProfile, (state) => {
      state.status = "offline";
    })
    .addCase(wsErrorProfile, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessageProfile, (state, action) => {
      state.orders = action.payload;
    });
});
