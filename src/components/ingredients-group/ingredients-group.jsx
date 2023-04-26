import PropTypes from 'prop-types';
import cn from "classnames";
import styles from "./ingredients-group.module.css";
import Card from "../card/card.jsx";


function IngredientsGroup({
  name,
  type,
  data,
  setClickedIngredient,
}) {

  const subgroupData = data.filter((item) => item.type === type);
  return (
    <>
      <h2 className={cn("mt-10", "text", "text_type_main-medium")}>{name}</h2>
      <div className={styles.ingredientsSubgroup}>
        {subgroupData.map((item) => (
          <Card
            data={data}
            item={item}
            key={item._id}
            setClickedIngredient={setClickedIngredient}
          />
        ))}
      </div>
    </>
  );
}

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  })).isRequired,
  setClickedIngredient: PropTypes.func.isRequired,
};


export default IngredientsGroup;

