import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { popupClosed } from "../../services/modal-slice";
import { ingredientClickedRemoved } from '../../services/ingredients-slice'
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

function Modal({ children, title }) {
  const rootForModal = document.getElementById("modal");

  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        dispatch(popupClosed());
        dispatch(ingredientClickedRemoved());
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  });

  const handleCloseButton = () => {
    dispatch(popupClosed());
    dispatch(ingredientClickedRemoved());
  }

  return createPortal(
    <>
      <section className={cn(styles.popup, "pt-15", "pr-10", "pl-10", "pb-15")}>
        <div className={styles.heading}>
          {title && (
            <h2 className={cn(styles.title, "text", "text_type_main-large")}>
              {title}
            </h2>
          )}
          <button
            onClick={() => handleCloseButton()}
            className={styles.closeButton}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </section>
      <ModalOverlay />
    </>,
    rootForModal
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  popupCloseButtonHandler: PropTypes.func.isRequired,
};

export default Modal;
