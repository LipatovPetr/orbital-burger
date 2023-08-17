import React, { useMemo, useEffect, useState } from "react";
import { useAppSelector } from "../app/app";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { OrderItem } from "../../store/FeedAllOrders/types";
import {
  getOrderIngredients,
  calculateTotalPrice,
  mapStatusToOrderStatus,
} from "../../utils/helpers/order.helpers";

type OrderCardProps = {
  data: OrderItem;
  isProfile?: boolean;
};

function OrderCard({ data, isProfile = false }: OrderCardProps) {
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState("");
  const { createdAt, number, name, status } = data;
  const allIngredients = useAppSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo(() => {
    return getOrderIngredients(data, allIngredients);
  }, [data, allIngredients]);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(orderIngredients);
  }, [orderIngredients]);

  const renderIngredients = () => {
    const filteredIngredients = orderIngredients.slice(0, 5);
    return filteredIngredients.map((ingredient, index) => (
      <div
        key={index}
        className={styles.image}
        style={{
          backgroundImage: `url("${ingredient?.image_mobile}")`,
          zIndex: filteredIngredients.length - index,
        }}
      />
    ));
  };

  useEffect(() => {
    const newOrderStatus = mapStatusToOrderStatus(status);
    setOrderStatus(newOrderStatus);
  }, [status]);

  return (
    <Link
      to={`${number}`}
      state={{ background: location }}
      className={styles.card}
    >
      <div className={styles.infoContainer}>
        <p
          className={styles.number}
          onClick={() => {
            console.log(data);
          }}
        >{`#${number}`}</p>
        <div>
          <FormattedDate className={styles.date} date={new Date(createdAt)} />
          <span className={styles.date}>i-GMT+3</span>
        </div>
      </div>
      <p className={styles.title}>{name}</p>
      {isProfile && (
        <p className={status === "done" ? styles.status_done : styles.status}>
          {orderStatus}
        </p>
      )}
      <div className={styles.ingredientsInfo}>
        <div className={styles.imagesContainer}>
          {renderIngredients()}
          {orderIngredients.length > 5 && (
            <div
              key={5}
              className={styles.image}
              style={{
                backgroundImage: `url("${orderIngredients[5]?.image_mobile}")`,
                zIndex: 0.1,
              }}
            >
              <div className={styles.imageOverlay}>
                {`+${orderIngredients.length - 5}`}
              </div>
            </div>
          )}
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
