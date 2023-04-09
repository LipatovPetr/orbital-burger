import React from "react";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group.jsx";

function BurgerIngredients({
  data,
  clickedIngredient,
  setClickedIngredient,
  setIngredientsPopupOpen,
}) {
  const [current, setCurrent] = React.useState("Булки");

  return (
    <div className={styles.section}>
      <h1 className={styles.heading + " text text_type_main-large"}>
        Соберите бургер
      </h1>

      <div className={styles.tab + " mt-5"}>
        <Tab value="Булки" active={current === "Булки"}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"}>
          Соусы
        </Tab>
        <Tab value="Главное" active={current === "Главное"}>
          Начинки
        </Tab>
      </div>

      <div className={styles.menuSection}>
        <IngredientsGroup
          name="Булки"
          type="bun"
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
          setIngredientsPopupOpen={setIngredientsPopupOpen}
        />
        <IngredientsGroup
          name="Соусы"
          type="sauce"
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
          setIngredientsPopupOpen={setIngredientsPopupOpen}
        />
        <IngredientsGroup
          name="Главное"
          type="main"
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
          setIngredientsPopupOpen={setIngredientsPopupOpen}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  clickedIngredient: PropTypes.object.isRequired,
  setClickedIngredient: PropTypes.func.isRequired,
  setIngredientsPopupOpen: PropTypes.func.isRequired,
};
