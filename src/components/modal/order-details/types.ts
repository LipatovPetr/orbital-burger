import { ServerResponse } from "../../../utils/api/types";
import { OrderItem } from "../../../store/FeedAllOrders/types";

export type SuccessOrderFetchResponse = ServerResponse & {
  success: boolean;
  orders: OrderItemExtended[];
};

export type OrderItemExtended = OrderItem & {
  __v?: 0;
  owner?: "64ceda3282e277001bfa71b7";
};
