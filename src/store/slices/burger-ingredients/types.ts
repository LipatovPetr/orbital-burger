import { ServerResponse } from "../../../utils/api/types";

export interface IngredientItem {
  __v: number;
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  uuid?: string;
}

export interface IngredientsState {
  data: IngredientItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}

export interface SuccessIngredientsFetch extends ServerResponse {
  status: boolean;
  data: IngredientItem[];
}
