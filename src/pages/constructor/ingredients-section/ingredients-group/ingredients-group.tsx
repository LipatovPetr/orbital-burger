import cn from "classnames";
import styles from "./ingredients-group.module.css";
import Card from "../ingredient-card/ingredient-card";
import { useAppSelector } from "../../../../components/app/app";
import React, { Ref } from "react";

type IngredientsGroupProps = {
  name: string;
  type: string;
};

const IngredientsGroup = React.forwardRef(
  ({ name, type }: IngredientsGroupProps, ref: Ref<HTMLDivElement>) => {
    const data = useAppSelector((state) => state.ingredients.data);
    const subgroupData = data.filter((item) => item.type === type);

    return (
      <>
        <h2 className={cn("mt-10", "text", "text_type_main-medium")}>{name}</h2>
        <div className={styles.ingredientsSubgroup} ref={ref}>
          {subgroupData.map((item) => (
            <Card item={item} key={item._id} />
          ))}
        </div>
      </>
    );
  }
);

export default IngredientsGroup;
