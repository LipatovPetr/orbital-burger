import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ingredientsReducer from "../../services/ingredients-slice";
import modalReducer from "../../services/modal-slice";
import { fetchData } from "../../services/ingredients-slice";

const store = configureStore({ 
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer
  }
});

function App() {

  useEffect(function fetchIngredients() {
    store.dispatch(fetchData());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Provider store={store}>
          <BurgerIngredients />
          <BurgerConstructor />
        </Provider>
      </main>
    </div>
  );
}

export default App;
