import styles from "./order-view.module.css";
import cn from "classnames";

// hooks

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../components/app/app";
import { useEffect, useRef, useState, useMemo } from "react";

// components

import Preloader from "../../components/preloader/preloader";
import IngredientCard from "../../components/ingredient-card/ingredient-card";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

// types

import {
  OrderItemExtended,
  SuccessOrderFetchResponse,
} from "../../components/modal/order-details/types";

// functions

import { fetchRequest, handleResponse } from "../../utils/api/api";

import {
  getOrderIngredients,
  mapStatusToOrderStatus,
  calculateTotalPrice,
  groupIngredients,
} from "../../utils/helpers/order.helpers";

function OrderView() {
  const [order, setOrder] = useState<OrderItemExtended>();
  const [orderStatus, setOrderStatus] = useState("");
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
  }, []);

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
  }, [allIngredients, order]);

  const groupedIngredients = useMemo(() => {
    return groupIngredients(orderIngredients);
  }, [orderIngredients]);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(orderIngredients);
  }, [orderIngredients]);

  return order ? (
    <div className={styles.section}>
      <div className={styles.container}>
        <p className={styles.number}>{`#${order.number}`}</p>
        <p
          className={cn(styles.name, {
            [styles["name-text-small"]]: order.name.length > 100,
          })}
        >
          {order.name}
        </p>
        <p className={styles.status}>{orderStatus}</p>
        <p className={styles.text}>Состав:</p>
        <div className={styles.list}>
          {groupedIngredients?.map((item) => {
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
    </div>
  ) : (
    <Preloader />
  );
}

export default OrderView;
