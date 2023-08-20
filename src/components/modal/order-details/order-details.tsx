import styles from "./order-details.module.css";

// hooks

import { useState, useEffect, useMemo } from "react";
import { useAppSelector } from "../../app/app";
import { useParams } from "react-router-dom";

// components

import Preloader from "../../preloader/preloader";
import IngredientCard from "../../ingredient-card/ingredient-card";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

// types

import { SuccessOrderFetchResponse, OrderItemExtended } from "./types";

// functions

import { fetchRequest, handleResponse } from "../../../utils/api/api";
import {
  calculateTotalPrice,
  getOrderIngredients,
  mapStatusToOrderStatus,
  groupIngredients,
} from "../../../utils/helpers/order.helpers";

function OrderDetails() {
  const [order, setOrder] = useState<OrderItemExtended>();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const { id } = useParams();
  const allIngredients = useAppSelector((state) => state.ingredients.data);

  useEffect(() => {
    async function getOrder() {
      try {
        const res = await fetchRequest(`/orders/${id}`);
        const jsonData = await handleResponse<SuccessOrderFetchResponse>(res);
        setOrder(jsonData.orders[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
  }, [id]);

  useEffect(() => {
    function mapOrderStatus() {
      if (order && order.status) {
        const formattedOrderStatus = mapStatusToOrderStatus(order.status);
        setOrderStatus(formattedOrderStatus);
      }
    }
    mapOrderStatus();
  }, [order]);

  const orderIngredients = useMemo(() => {
    return getOrderIngredients(order, allIngredients);
  }, [order, allIngredients]);

  const groupedIngredients = useMemo(() => {
    return groupIngredients(orderIngredients);
  }, [orderIngredients]);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(orderIngredients);
  }, [orderIngredients]);

  return order ? (
    <div className={styles.container}>
      <p className={styles.number}>{`#${order.number}`}</p>
      <p className={styles.name} onClick={() => console.log(order)}>
        {order.name}
      </p>
      <p className={styles.status}>{orderStatus}</p>
      <p className={styles.text}>Состав:</p>
      <div className={styles.list}>
        {groupedIngredients.map((item) => {
          return (
            <IngredientCard
              image_mobile={item.image_mobile}
              name={item.name}
              count={item.count}
              price={item.price}
              key={item._id}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        <div>
          <FormattedDate
            className={styles.date}
            date={new Date(order.createdAt)}
          />
          <span className={styles.date}>i-GMT+3</span>
        </div>

        <div className={styles.priceContainer}>
          <p className={styles.price}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
}

export default OrderDetails;
