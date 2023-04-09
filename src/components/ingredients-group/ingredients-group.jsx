import styles from "./ingredients-group.module.css";
import Card from "../card/card.jsx";
import PropTypes from 'prop-types';

function IngredientsGroup({
  name,
  type,
  data,
  setClickedIngredient,
  setIngredientsPopupOpen,
}) {

  const subgroupData = data.filter((item) => item.type === type);
  return (
    <>
      <h2 className="mt-10 text text_type_main-medium">{name}</h2>
      <div className={styles.ingredientsSubgroup}>
        {subgroupData.map((item) => (
          <Card
            data={data}
            item={item}
            key={item._id}
            setClickedIngredient={setClickedIngredient}
            setIngredientsPopupOpen={setIngredientsPopupOpen}
          />
        ))}
      </div>
    </>
  );
}

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  setClickedIngredient: PropTypes.func.isRequired,
  setIngredientsPopupOpen: PropTypes.func.isRequired,
}

export default IngredientsGroup;

