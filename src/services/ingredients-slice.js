import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  clickedIngredient: {},
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("ingredients/fetchData", async () => {
  const response = await fetch(
    "https://norma.nomoreparties.space/api/ingredients"
  );
  const data = await response.json();
  return data.data;
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    ingredientClicked(state, action) {
      const ingredientId = action.payload;
      const existingIngredient = state.data.find(
        (item) => item._id === ingredientId
      );
      if (existingIngredient) {
        state.clickedIngredient = existingIngredient;
      }
    },
    ingredientClickedRemoved(state) {
      state.clickedIngredient = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;

export const { ingredientClicked, ingredientClickedRemoved } = ingredientsSlice.actions;
