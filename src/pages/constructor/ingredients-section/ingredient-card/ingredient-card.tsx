import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../../../components/app/app";
import { Link, useLocation } from "react-router-dom";

import { IngredientItem } from "../../../../store/slices/burger-ingredients/types";

type ingredientCardProps = {
  item: IngredientItem;
};

function Card({ item: { _id, image, name, price } }: ingredientCardProps) {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
  });

  const chosenBun = useAppSelector((state) => state.burgerConstructor.bun);
  const chosenStuffings = useAppSelector(
    (state) => state.burgerConstructor.stuffings
  );
  const count = chosenStuffings?.filter((item) => item._id === _id).length || 0;

  return (
    <Link
      className={cn(styles.card, "ml-4", "mt-6")}
      data-id={_id}
      ref={dragRef}
      to={`/ingredient/${_id}`}
      state={{ background: location }}
    >
      <img
        className={cn(styles.cardImage, "mt-1", "ml-4")}
        src={image}
        alt={image}
      ></img>
      <div className={styles.priceElement}>
        <span className={cn("mr-2")}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cardTitle}>{name}</p>
      <Counter
        count={chosenBun?._id === _id ? count + 2 : count}
        size="default"
        extraClass="m-1"
      />
    </Link>
  );
}

export default Card;
