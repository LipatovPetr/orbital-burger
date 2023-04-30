import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from 'react-redux'
import { ingredientClicked } from '../../services/ingredients-slice'
import { popupOpened } from '../../services/modal-slice'


 
function Card({ item }) {

  const dispatch = useDispatch()

  const handleIngredientClick = (evt) => {
    const ingredientId = evt.currentTarget.dataset.id;
    dispatch(ingredientClicked(ingredientId));
    dispatch(popupOpened());
  };

  return (
    <div
      className={cn(styles.card, "ml-4", "mt-6")}
      data-id={item._id}
      onClick={handleIngredientClick}
    >
      <img
        className={cn(styles.cardImage, "mt-1", "ml-4")}
        src={item.image}
        alt={item.name}
      ></img>
      <div
        className={cn(styles.priceElement, "mt-1", "text", "text_type_digits-default")}
      >
        <span className={cn(styles.price, "mr-2")}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={cn(styles.cardTitle, "mt-1", "text", "text_type_main-small")}>
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
