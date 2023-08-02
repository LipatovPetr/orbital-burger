import React, { useEffect, useRef, useState, useMemo } from "react";
import cn from "classnames";
import styles from "./order-view.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../../components/ingredient-card/ingredient-card";
import { fetchRequest, handleResponse } from "../../services/utils/api";
import Preloader from "../../components/preloader/preloader";
import moment from "moment";
import "moment/locale/ru";

function OrderView() {
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const { id } = useParams();
  const allIngredients = useSelector((state) => state.ingredients.data);

  useEffect(() => {
    async function getOrder() {
      try {
        const res = await fetchRequest(`/orders/${id}`);
        const jsonData = await handleResponse(res);
        setOrder(jsonData.orders[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
  }, []);

  const orderIngredients = useMemo(() => {
    if (order.ingredients) {
      return order.ingredients.map((id) =>
        allIngredients.find((item) => item._id === id)
      );
    }
  }, [allIngredients, order.ingredients]);

  useEffect(() => {
    switch (order.status) {
      case "created":
        setOrderStatus("Создан");
        break;
      case "pending":
        setOrderStatus("Готовится");
        break;
      case "done":
        setOrderStatus("Выполнен");
        break;
      default:
        setOrderStatus("Статус неизвестен");
        break;
    }
  }, [order.status]);

  const formattedDate = useMemo(() => {
    const currentDate = moment();
    return moment(order.createdAt).utcOffset("+03:00").calendar(currentDate, {
      sameDay: "[Сегодня,] HH:mm [i-GMT+3]",
      lastDay: "[Вчера,] HH:mm [i-GMT+3]",
      lastWeek: "dddd, HH:mm [i-GMT+3]",
      sameElse: "DD MMMM YYYY, HH:mm [i-GMT+3]",
    });
  }, [order.createdAt]);

  const groupedIngredients = useMemo(() => {
    if (orderIngredients) {
      return Object.values(
        orderIngredients.reduce((acc, item) => {
          const id = item._id;
          if (!acc[id]) {
            acc[id] = { ...item, count: 1 };
          } else {
            acc[id].count++;
          }
          return acc;
        }, {})
      );
    }
  }, [orderIngredients]);

  const totalPrice = useMemo(() => {
    return orderIngredients?.reduce(
      (accumulator, currentIngredient) =>
        accumulator + (currentIngredient?.price || 0),
      0
    );
  }, [orderIngredients]);

  return Object.keys(order).length === 0 ? (
    <Preloader />
  ) : (
    <div className={styles.section}>
      <div className={styles.container}>
        <p className={styles.number}>{`#${order.number}`}</p>
        <p className={styles.name}>{order.name}</p>
        <p className={styles.status}>{orderStatus}</p>
        <p className={styles.text}>Состав:</p>
        <div className={styles.list}>
          {groupedIngredients?.map((item) => {
            return <IngredientCard data={item} />;
          })}
        </div>
        <div className={styles.footer}>
          <p className={styles.date}>{formattedDate}</p>
          <div className={styles.priceContainer}>
            <p className={styles.price}>{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
