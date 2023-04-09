import React from "react";
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ data, setOrderPopupOpen }) {
  const lockedIngredient = data.find(
    (item) => item.name === "Краторная булка N-200i"
  );

  const handleOrderClick = () => {
    setOrderPopupOpen(true);
  };

  return (
    <div className={styles.section}>
      <div className={styles.ingredients + " mt-25"}>
        {lockedIngredient && (
          <div className={styles.ingredientContainer + " pl-4 pr-4"}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${lockedIngredient.name} (верх)`}
              price={lockedIngredient.price}
              thumbnail={lockedIngredient.image}
            />
          </div>
        )}

        <div className={styles.scrolledSection}>
          {data.map((item) => (
            <div
              className={styles.ingredientContainer + " pl-4 pr-4"}
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
        {lockedIngredient && (
          <div className={styles.ingredientContainer + " pl-4 pr-4"}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${lockedIngredient.name} (низ)`}
              price={lockedIngredient.price}
              thumbnail={lockedIngredient.image}
            />
          </div>
        )}
      </div>

      <div className={styles.orderInfo + " mt-10 mr-4"}>
        <div className={styles.priceContainer + " mr-10"}>
          <span className={styles.priceValue + " text text_type_digits-medium"}>
            610
          </span>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setOrderPopupOpen: PropTypes.func.isRequired,
};