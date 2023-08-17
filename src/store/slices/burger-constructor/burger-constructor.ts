import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ConstructorState } from "./types";
import { IngredientItem } from "../burger-ingredients/types";

const initialState: ConstructorState = {
  bun: undefined,
  stuffings: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IngredientItem>) {
      if (action.payload.type === "bun") {
        state.bun = { ...action.payload, uuid: uuidv4() };
      } else {
        state.stuffings.push({ ...action.payload, uuid: uuidv4() });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.stuffings.splice(action.payload, 1);
    },
    clearConstructor(state) {
      state.stuffings = [];
      state.bun = undefined;
    },

    ingredientMoved(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const updatedStuffings = [...state.stuffings];
      const [movedItem] = updatedStuffings.splice(fromIndex, 1);
      updatedStuffings.splice(toIndex, 0, movedItem);
      state.stuffings = updatedStuffings;
    },
  },
});

export default constructorSlice.reducer;
export const { addItem, removeItem, clearConstructor, ingredientMoved } =
  constructorSlice.actions;
