import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

const initialState = {
  status: "offline",
  orders: [],
  connectionError: "",
};

export const allOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = "connecting...";
    })
    .addCase(wsOpen, (state) => {
      state.status = "online";
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = "offline";
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
    });
});
