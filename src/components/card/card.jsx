import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Card({ data, item, setClickedIngredient}) {
  const handleIngredientClick = (evt) => {
    const ingredientId = evt.currentTarget.dataset.id;
    const ingredientData = data.find((item) => item._id === ingredientId);
    setClickedIngredient(ingredientData);

  };

  return (
    <div
      className={styles.card + " ml-4 mt-6"}
      data-id={item._id}
      onClick={handleIngredientClick}
    >
      <img
        className={styles.cardImage + " mt-1 ml-4"}
        src={item.image}
        alt={item.name}
      ></img>
      <div
        className={styles.priceElement + " mt-1 text text_type_digits-default"}
      >
        <span className={styles.price + " mr-2"}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cardTitle + " mt-1 text text_type_main-small"}>
        {item.name}
      </p>
      <Counter count={0} size="default" extraClass="m-1" />
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
  setClickedIngredient: PropTypes.func.isRequired,
};

export default Card;
