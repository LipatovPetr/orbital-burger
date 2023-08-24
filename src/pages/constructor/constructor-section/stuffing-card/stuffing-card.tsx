import { useRef, RefObject } from "react";
import styles from "./stuffing-card.module.css";
import cn from "classnames";
import type { Identifier, XYCoord } from "dnd-core";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../../../components/app/app";
import { StuffingCardProps, DraggedCard } from "./types";
import { useDrag, useDrop } from "react-dnd";
import {
  ingredientMoved,
  removeItem,
} from "../../../../store/slices/burger-constructor/burger-constructor";

function StuffingCard({ ingredient, index }: StuffingCardProps) {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const dispatch = useAppDispatch();
  const uuid = ingredient.uuid;

  const [{ handlerId }, drop] = useDrop<
    DraggedCard,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "stuffing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(ingredientMoved({ fromIndex: dragIndex, toIndex: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "stuffing",
    item: () => {
      return { uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleRemoveItemClick = () => {
    dispatch(removeItem(index));
  };

  return (
    <div
      className={cn(styles.ingredientContainer, "pl-4", "pr-4")}
      style={{ opacity }}
      key={ingredient._id}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={handleRemoveItemClick}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}

export default StuffingCard;
