import styles from "./bun-element.module.css";
import cn from "classnames";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItem } from "../../../../store/slices/burger-ingredients/types";

type BunElementProps = {
  item: IngredientItem;
  type: "top" | "bottom";
};

function BunElement({ item, type }: BunElementProps) {
  return (
    <div className={cn(styles.ingredientContainer, "pl-4", "pr-4")}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={type === "top" ? `${item.name} (верх)` : `${item.name} (низ)`}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
}

export default BunElement;
