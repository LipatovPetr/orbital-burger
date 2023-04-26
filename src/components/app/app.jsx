import React from "react";
import { useState, useEffect } from "react";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import styles from "./app.module.css";
import { fetchData } from "../../utils/api.js";
import { serverAddress } from "../../utils/constants.js";



function App() {
  const [data, setData] = useState([]);
  const [clickedIngredient, setClickedIngredient] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(serverAddress);
      setData(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          data={data}
          clickedIngredient={clickedIngredient}
          setClickedIngredient={setClickedIngredient}
        />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
