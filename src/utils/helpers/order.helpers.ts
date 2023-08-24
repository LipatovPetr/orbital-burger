import { OrderItemExtended } from "../../components/modal/order-details/types";
import { IngredientItem } from "../../store/slices/burger-ingredients/types";

export const getOrderIngredients = (
  orderData: OrderItemExtended | undefined,
  ingredientsData: IngredientItem[]
) => {
  if (orderData && orderData.ingredients) {
    return orderData.ingredients
      .map((id) => ingredientsData.find((item) => item._id === id))
      .filter(
        (ingredient): ingredient is IngredientItem => ingredient !== undefined
      );
  }
  return [];
};

export const calculateTotalPrice = (ingredients: IngredientItem[]) => {
  return ingredients.reduce(
    (accumulator, currentIngredient) =>
      accumulator + (currentIngredient?.price || 0),
    0
  );
};

export function mapStatusToOrderStatus(status: string): string {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return "Статус неизвестен";
  }
}

export const groupIngredients = (ingredientsArray: IngredientItem[]) => {
  if (ingredientsArray) {
    const grouped: { [key: string]: IngredientItem & { count: number } } = {};
    ingredientsArray.forEach((item) => {
      const id = item._id;
      if (!grouped[id]) {
        grouped[id] = { ...item, count: 1 };
      } else {
        grouped[id].count++;
      }
    });
    return Object.values(grouped);
  }
  return [];
};
