import PropTypes from 'prop-types';
import cn from "classnames";
import styles from "./ingredients-group.module.css";
import Card from "../card/card.jsx";
import { useSelector } from 'react-redux'


function IngredientsGroup({
  name,
  type,
}) {

  const data = useSelector(state => state.ingredients.data)
  const subgroupData = data.filter((item) => item.type === type);

  return (
    <>
      <h2 className={cn("mt-10", "text", "text_type_main-medium")}>{name}</h2>
      <div className={styles.ingredientsSubgroup}>
        {subgroupData.map((item) => (
          <Card
            item={item}
            key={item._id}
          />
        ))}
      </div>
    </>
  );
}




export default IngredientsGroup;

