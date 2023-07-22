import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard({ data }) {
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientContainer}>
        <div
          className={styles.ingredientImage}
          style={{
            backgroundImage: `url("${data.image_mobile}")`,
          }}
        ></div>
        <p className={styles.ingredientName}>{data.name}</p>
      </div>
      <div className={styles.ingredientPriceContainer}>
        <div
          className={styles.ingredientPrice}
        >{`${data.count} x ${data.price}`}</div>
        <CurrencyIcon />
      </div>
    </div>
  );
}

export default IngredientCard;
