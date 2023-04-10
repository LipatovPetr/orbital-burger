import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";


function BurgerIngredients({
  data,
  clickedIngredient,
  setClickedIngredient,
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
        />
        <IngredientsGroup
          name="Соусы"
          type="sauce"
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
        />
        <IngredientsGroup
          name="Главное"
          type="main"
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
        />
      </div>
      {clickedIngredient && (
        <Modal
          title="Детали ингредиентов"
          popupCloseButtonHandler={setClickedIngredient}
        >
          <IngredientDetails data={clickedIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  })).isRequired,
  clickedIngredient: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  })).isRequired,
  setClickedIngredient: PropTypes.func.isRequired,
  setIngredientsPopupOpen: PropTypes.func.isRequired,
};
