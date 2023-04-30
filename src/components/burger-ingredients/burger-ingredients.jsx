import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { INGREDIENTS_TYPES } from "../../utils/constants";

import { useSelector } from "react-redux";

function BurgerIngredients() {
  const [current] = React.useState(INGREDIENTS_TYPES.buns);

  const clickedIngredient = useSelector((state) => state.ingredients.clickedIngredient);
  const popupOpened = useSelector((state) => state.modal.opened);

  return (
    <div className={styles.section}>
      <h1 className={cn(styles.heading, "text", "text_type_main-large")}>
        Соберите бургер
      </h1>

      <div className={cn(styles.tab, "mt-5")}>
        <Tab
          value={INGREDIENTS_TYPES.buns}
          active={current === INGREDIENTS_TYPES.buns}
        >
          {INGREDIENTS_TYPES.buns}
        </Tab>
        <Tab
          value={INGREDIENTS_TYPES.sauces}
          active={current === INGREDIENTS_TYPES.sauces}
        >
          {INGREDIENTS_TYPES.sauces}
        </Tab>
        <Tab
          value={INGREDIENTS_TYPES.main}
          active={current === INGREDIENTS_TYPES.main}
        >
          {INGREDIENTS_TYPES.main}
        </Tab>
      </div>

      <div className={styles.menuSection}>
        <IngredientsGroup name="Булки" type="bun" />
        <IngredientsGroup name="Соусы" type="sauce" />
        <IngredientsGroup name="Главное" type="main" />
      </div>
      {popupOpened && (
        <Modal title="Детали ингредиентов">
          <IngredientDetails data={clickedIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerIngredients;
