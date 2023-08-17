import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleResponse } from "../../../utils/api/api";
import { IngredientsState, SuccessIngredientsFetch } from "./types";

const initialState: IngredientsState = {
  data: [],
  status: "idle",
  error: undefined,
};

export const fetchIngredients = createAsyncThunk<SuccessIngredientsFetch>(
  "ingredients/fetchData",
  async () => {
    try {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      );
      const jsonData = await handleResponse<SuccessIngredientsFetch>(res);
      return jsonData;
    } catch (error) {
      throw error;
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
