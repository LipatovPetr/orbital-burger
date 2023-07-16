import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./order-view.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../../components/ingredient-card/ingredient-card";

const mockData = {
  _id: "64b2b6a082e277001bf8f878",
  ingredients: [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa093d",
  ],
  status: "done",
  name: "Space флюоресцентный spicy бургер",
  createdAt: "2023-07-15T15:09:20.425Z",
  updatedAt: "2023-07-15T15:09:20.544Z",
  number: 12669,
};

function OrderView() {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data);
  const chosenIngredient = ingredients.find((item) => item._id === id);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <p className={styles.number}>{`#${mockData.number}`}</p>
        <p className={styles.name}>{mockData.name}</p>
        <p className={styles.status}>{mockData.status}</p>
        <p className={styles.text}>Состав:</p>
        <div className={styles.list}>
          <IngredientCard />
          <IngredientCard />
        </div>
        <div className={styles.footer}>
          <p className={styles.date}>{mockData.createdAt}</p>
          <div className={styles.priceContainer}>
            <p className={styles.price}>420</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
