import { IngredientItem } from "../burger-ingredients/types";

export interface ConstructorState {
  bun: IngredientItem | undefined;
  stuffings: IngredientItem[];
}
