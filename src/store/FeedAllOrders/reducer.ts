import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";
import { FeedOrdersState, OrdersData } from "./types";

const initialState: FeedOrdersState = {
  status: "offline",
  ordersData: undefined,
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
      if (
        typeof action.payload === "object" &&
        action.payload !== null &&
        "orders" in action.payload &&
        "success" in action.payload &&
        "total" in action.payload &&
        "totalToday" in action.payload
      ) {
        state.ordersData = action.payload as OrdersData;
      }
    });
});
