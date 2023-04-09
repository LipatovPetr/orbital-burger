import React from "react";
import { useState, useEffect } from "react";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";

import styles from "./app.module.css";
import { orderData } from "../ulils/data.js";

const api = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);
  const [clickedIngredient, setClickedIngredient] = useState("");
  const [ingredientsPopupIsOpen, setIngredientsPopupOpen] = useState(false);
  const [orderPopupIsOpen, setOrderPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api);
      const jsonData = await response.json();
      setData(jsonData.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
          setIngredientsPopupOpen={setIngredientsPopupOpen}
        />
        <BurgerConstructor data={data} setOrderPopupOpen={setOrderPopupOpen} />
      </main>
      {ingredientsPopupIsOpen && (
        <Modal
          title="Детали ингредиентов"
          popupCloseButtonHandler={setIngredientsPopupOpen}
        >
          <IngredientDetails data={clickedIngredient} />
        </Modal>
      )}
      {orderPopupIsOpen && (
        <Modal popupCloseButtonHandler={setOrderPopupOpen}>
          <OrderDetails orderData={orderData} />
        </Modal>
      )}
    </div>
  );
}

export default App;
