import styles from "./ingredients-list.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { addItem } from "../../../../store/slices/burger-constructor/burger-constructor";
import {
  totalPriceUpdated,
  orderListUpdated,
} from "../../../../store/slices/order/order";
import Placeholder from "../placeholder/placeholder";
import BunElement from "../bun-element/bun-element";
import StuffingCard from "../stuffing-card/stuffing-card";
import { useAppSelector, useAppDispatch } from "../../../../components/app/app";
import { draggedItem } from "./types";

function IngredientsList() {
  const dispatch = useAppDispatch();

  const { availableIngredients, chosenStuffings, chosenBun } = useAppSelector(
    (state) => ({
      availableIngredients: state.ingredients.data,
      chosenStuffings: state.burgerConstructor.stuffings,
      chosenBun: state.burgerConstructor.bun,
    })
  );

  const handleDrop = (item: draggedItem) => {
    const draggedItem = availableIngredients.find(
      (ingredient) => ingredient._id === item._id
    );
    if (draggedItem) {
      dispatch(addItem(draggedItem));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: draggedItem) {
      handleDrop(item);
    },
  });

  useEffect(
    function updateTotalPrice() {
      if (chosenBun || chosenStuffings) {
        dispatch(totalPriceUpdated({ bun: chosenBun, stuff: chosenStuffings }));
      }
    },
    [chosenBun, chosenStuffings]
  );

  useEffect(
    function updateOrderList() {
      if (chosenBun && chosenStuffings!.length > 0) {
        dispatch(orderListUpdated({ bun: chosenBun, stuff: chosenStuffings }));
      }
    },
    [chosenBun, chosenStuffings]
  );

  return (
    <div className={cn(styles.ingredients, "mt-25")} ref={dropTarget}>
      {chosenBun ? (
        <BunElement item={chosenBun} type={"top"} />
      ) : (
        <Placeholder text={"your bun"} />
      )}
      <div className={styles.scrolledSection}>
        {chosenStuffings && chosenStuffings.length > 0 ? (
          chosenStuffings.map((ingredient, i) => (
            <StuffingCard
              ingredient={ingredient}
              key={ingredient.uuid}
              index={i}
            />
          ))
        ) : (
          <Placeholder text={"main and sauces"} />
        )}
      </div>
      {chosenBun ? (
        <BunElement item={chosenBun} type={"bottom"} />
      ) : (
        <Placeholder text={"your bun"} />
      )}
    </div>
  );
}

export default IngredientsList;
