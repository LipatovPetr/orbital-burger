import { createSlice } from "@reduxjs/toolkit";
import { CheckoutPopupState } from "./types";

const initialState: CheckoutPopupState = {
  opened: false,
};

const checkoutSlice = createSlice({
  name: "checkoutPopup",
  initialState,
  reducers: {
    checkoutPopupOpened(state) {
      state.opened = true;
    },
    checkoutPopupClosed(state) {
      state.opened = false;
    },
  },
});

export default checkoutSlice.reducer;

export const { checkoutPopupOpened, checkoutPopupClosed } =
  checkoutSlice.actions;
