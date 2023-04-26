import styles from "./ingredients-list.module.css";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { IngredientsContext } from "../../utils/ingredients-context.js";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientsList({ setTotalPrice, setOrderData }) {
  const [chosenBun, setChosenBun] = useState(null);
  const [chosenStuffings, setChosenStuffings] = useState(null);

  const ingredientsData = useContext(IngredientsContext);

  useEffect(
    function updateChosenStuffings () {
      if (ingredientsData) {
        setChosenStuffings(
          ingredientsData.filter((item) => item.type !== "bun")
        );
      }
    },
    [ingredientsData]
  );

  useEffect(
    function setDefaultBun() {
      if (ingredientsData && !chosenBun) {
        setChosenBun(ingredientsData.find((item) => item.type === "bun"));
      }
    },
    [chosenBun, ingredientsData]
  );

  useEffect(
    function updateOrderList() {
      if (chosenBun) {
        const chosenBunIds = [chosenBun._id, chosenBun._id] 
        const chosenStuffingsIds = chosenStuffings.map(ingredient => ingredient._id)
        setOrderData(chosenBunIds.concat(chosenStuffingsIds));
      }
    },
    [chosenStuffings, chosenBun, setOrderData]
  );


  useEffect(
    function updateTotalPrice() {
      if (chosenStuffings && chosenBun) {
        const bunsSumm = chosenBun.price * 2;
        const filteredIngredientsSumm = chosenStuffings?.reduce(
          (sum, component) => sum + component.price,
          0
        );
        setTotalPrice(filteredIngredientsSumm + bunsSumm);
      }
    },
    [chosenStuffings, chosenBun, setTotalPrice]
  );

  return (
    <div className={cn(styles.ingredients, "mt-25")}>
      {chosenBun && (
        <div className={cn(styles.ingredientContainer, "pl-4", "pr-4")}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${chosenBun.name} (верх)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
        </div>
      )}

      <div className={styles.scrolledSection}>
        {chosenStuffings &&
          chosenStuffings.map((item) => (
            <div
              className={cn(styles.ingredientContainer, "pl-4", "pr-4")}
              key={item._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
      </div>
      {chosenBun && (
        <div className={cn(styles.ingredientContainer, "pl-4", "pr-4")}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${chosenBun.name} (низ)`}
            price={chosenBun.price}
            thumbnail={chosenBun.image}
          />
        </div>
      )}
    </div>
  );
}

export default IngredientsList;
