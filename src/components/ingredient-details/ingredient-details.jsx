import cn from "classnames";
import PropTypes from 'prop-types';
import styles from "./ingredient-details.module.css";


function IngredientDetails({ data }) {
  return (
    <div className={styles.box}>
      <img
        src={data && data.image}
        alt={data.name}
        className={styles.image}
      />

      <h3 className={cn("text", "text_type_main-medium", "pt-4", "pb-8")}>
        {data && data.name}
      </h3>

      <ul className={cn(styles.details, "pt-8")}>
        <li
          className={cn(styles.detail, "text", "text_type_main-default", "text_color_inactive")}
        >
          <span>Калории,ккал</span>
          {data.calories}
        </li>

        <li
          className={cn(styles.detail, "text", "text_type_main-default", "text_color_inactive")}
        >
          <span>Белки, г</span>
          {data.proteins}
        </li>

        <li
          className={cn(styles.detail, "text", "text_type_main-default", "text_color_inactive")}
        >
          <span>Жиры, г</span>
          {data.fat}
        </li>

        <li
          className={cn(styles.detail, "text", "text_type_main-default", "text_color_inactive")}
        >
          <span>Углеводы, г</span>
          {data.carbohydrates}
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
  })
}

export default IngredientDetails;
