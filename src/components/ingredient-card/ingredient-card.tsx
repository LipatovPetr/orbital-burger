import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type IngredientCardProps = {
  image_mobile: string;
  name: string;
  count: number;
  price: number;
};

function IngredientCard({
  image_mobile,
  name,
  count,
  price,
}: IngredientCardProps): JSX.Element {
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientContainer}>
        <div
          className={styles.ingredientImage}
          style={{
            backgroundImage: `url("${image_mobile}")`,
          }}
        ></div>
        <p className={styles.ingredientName}>{name}</p>
      </div>
      <div className={styles.ingredientPriceContainer}>
        <div className={styles.ingredientPrice}>{`${count} x ${price}`}</div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default IngredientCard;
