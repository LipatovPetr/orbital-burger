import { IngredientItem } from "../../../../store/slices/burger-ingredients/types";

export type StuffingCardProps = {
  ingredient: IngredientItem;
  index: number;
};

export type DraggedCard = {
  uuid: string;
  index: number;
};
