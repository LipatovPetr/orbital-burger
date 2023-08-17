import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchRequest, handleResponse } from "../../../utils/api/api";
import { OrderState, OrderIngredientsData, SuccessCheckout } from "./types";

const initialState: OrderState = {
  orderList: [],
  totalPrice: 0,
  status: "idle",
  orderNum: undefined,
  orderName: undefined,
  error: undefined,
};

export const postData = createAsyncThunk<SuccessCheckout, string[]>(
  "order/postData",
  async (data) => {
    try {
      const res = await fetchRequest("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ ingredients: data }),
      });
      const jsonData = await handleResponse<SuccessCheckout>(res);
      console.log(jsonData);
      return jsonData;
    } catch (err) {
      throw err;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    totalPriceUpdated(state, action: PayloadAction<OrderIngredientsData>) {
      const bun = action.payload.bun;
      const stuffings = action.payload.stuff;

      const bunPrice = bun ? bun.price * 2 : 0;
      const stuffingsPrice = stuffings
        ? stuffings.reduce((sum, component) => sum + component.price, 0)
        : 0;

      state.totalPrice = bunPrice + stuffingsPrice;
    },
    orderListUpdated(state, action: PayloadAction<OrderIngredientsData>) {
      const bunsId = action.payload.bun!._id;
      const stuffingsIds = action.payload.stuff!.map(
        (ingredient) => ingredient._id
      );
      state.orderList = [bunsId, ...stuffingsIds, bunsId];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNum = action.payload.order.number;
        state.orderName = action.payload.name;
        state.orderList = [];
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

export const { totalPriceUpdated, orderListUpdated } = orderSlice.actions;
