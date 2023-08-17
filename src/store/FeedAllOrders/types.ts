export type FeedOrdersState = {
  status: "connecting..." | "online" | "offline";
  ordersData: undefined | OrdersData;
  connectionError: string;
};

export type OrderItem = {
  _id: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type OrdersData = {
  orders: OrderItem[];
  success: boolean;
  total: number;
  totalToday: number;
};
