import { ServerResponse } from "../../../utils/api/types";
import { IngredientItem } from "../burger-ingredients/types";
import { OrderItem } from "../../FeedAllOrders/types";

export type OrderState = {
  orderList: string[];
  totalPrice: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  orderNum: undefined | number;
  orderName: undefined | string;
  error: undefined | string;
};

export type OrderIngredientsData = {
  bun: IngredientItem | undefined;
  stuff: IngredientItem[] | undefined;
};

export type OrderOwner = {
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
};

export type ConfirmedOrder = OrderItem & {
  ingredients: IngredientItem[];
  owner: OrderOwner;
  price: number;
};

export type SuccessCheckout = ServerResponse & {
  success: boolean;
  name: string;
  order: ConfirmedOrder;
};
