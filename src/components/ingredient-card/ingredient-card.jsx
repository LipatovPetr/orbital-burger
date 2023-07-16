import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard({ data }) {
  return (
    <div className={styles.ingredientCard}>
      <div></div>
      <div
        className={styles.ingredientImage}
        style={{
          backgroundImage: `url("https://code.s3.yandex.net/react/code/meat-03-mobile.png")`,
        }}
      ></div>
      <p className={styles.ingredientName}>
        Филе Люминесцентного тетраодонтимформа
      </p>
      <div className={styles.ingredientPriceContainer}>
        <div className={styles.ingredientPrice}>{`${2} x ${420}`}</div>
        <CurrencyIcon />
      </div>
    </div>
  );
}

export default IngredientCard;
