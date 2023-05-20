import {useRef} from 'react';
import styles from "./stuffing-element.module.css";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ingredientMoved } from "../../../services/burger-constructor-slice";

function StuffingElement({ ingredient }) {

  const ref = useRef(null);
  const dispatch = useDispatch();
  const uuid = ingredient.uuid;

  const [{ handlerId }, drop] = useDrop({
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
      const dragUUID = item.uuid;
      const hoverUUID = uuid;
      if (dragUUID === hoverUUID) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragUUID < hoverUUID && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragUUID > hoverUUID && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(ingredientMoved({ fromUUID: dragUUID, toUUID: hoverUUID }));
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "stuffing",
    item: () => {
      return { uuid };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={cn(styles.ingredientContainer, "pl-4", "pr-4", isDragging ? styles.invisible : '')}
      key={ingredient._id}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement

        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}

export default StuffingElement;
