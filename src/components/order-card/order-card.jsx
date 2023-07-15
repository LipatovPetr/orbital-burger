import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";

function OrderCard({ data }) {
  const { _id: id, ingredients, createdAt, number, name } = data;
  const allIngredients = useSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo(() => {
    if (ingredients) {
      return ingredients.map((id) =>
        allIngredients.find((item) => item._id === id)
      );
    }
  }, [allIngredients]);

  const formattedDate = useMemo(() => {
    const currentDate = moment();
    return moment(createdAt).utcOffset("+03:00").calendar(currentDate, {
      sameDay: "[Сегодня,] HH:mm [i-GMT+3]",
      lastDay: "[Вчера,] HH:mm [i-GMT+3]",
      lastWeek: "dddd, HH:mm [i-GMT+3]",
      sameElse: "DD MMMM YYYY, HH:mm [i-GMT+3]",
    });
  }, [createdAt]);

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

  const totalPrice = orderIngredients.reduce(
    (accumulator, currentIngredient) =>
      accumulator + (currentIngredient?.price || 0),
    0
  );

  return (
    <div className={styles.card}>
      <div className={styles.infoContainer}>
        <p className={styles.id}>{`#${number}`}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <p
        className={styles.title}
        onClick={() => {
          console.log(orderIngredients);
        }}
      >
        {name}
      </p>
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
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
