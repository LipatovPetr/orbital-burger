import cn from "classnames";
import styles from "./ingredient-view.module.css";
import { useAppSelector } from "../../components/app/app";
import { useParams } from "react-router-dom";

function IngredientView() {
  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.data);
  const chosenIngredient = ingredients.find((item) => item._id === id);
  const { image, name, calories, proteins, carbohydrates, fat } =
    chosenIngredient!;

  return (
    <section className={styles.section}>
      {chosenIngredient && (
        <div className={styles.box}>
          <h2 className={styles.title}>Детали ингредиента</h2>
          <img src={image} alt={name} className={styles.image} />

          <h3 className={cn("text", "text_type_main-medium", "pt-4", "pb-8")}>
            {name}
          </h3>

          <ul className={cn(styles.details, "pt-8")}>
            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Калории,ккал</span>
              {calories}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Белки, г</span>
              {proteins}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Жиры, г</span>
              {fat}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Углеводы, г</span>
              {carbohydrates}
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default IngredientView;
