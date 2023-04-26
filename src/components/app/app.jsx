import React from "react";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.css";
import { fetchData } from "../../utils/api.js";
import { serverAddress } from "../../utils/constants.js";
import { IngredientsContext } from "../../utils/ingredients-context.js";

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [clickedIngredient, setClickedIngredient] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(serverAddress);
      setIngredientsData(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
      <IngredientsContext.Provider value={ingredientsData}>
        <BurgerIngredients
          data={ingredientsData}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
        />
        <BurgerConstructor />
      </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;




