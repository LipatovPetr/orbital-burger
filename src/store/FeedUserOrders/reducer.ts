import { createReducer } from "@reduxjs/toolkit";
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from "./actions";

import { OrdersData, FeedOrdersState } from "../FeedAllOrders/types";

const initialState: FeedOrdersState = {
  status: "offline",
  ordersData: undefined,
  connectionError: "",
};

export const userOrdersReducer = createReducer(initialState, (builder) => {
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
