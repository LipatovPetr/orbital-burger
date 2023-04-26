import styles from "./modal.module.css";
import PropTypes from 'prop-types';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

function Modal({ children, title = "", popupCloseButtonHandler }) {
  const rootForModal = document.getElementById("modal");

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        popupCloseButtonHandler(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [popupCloseButtonHandler]);

  return createPortal(
    <>
      <section className={`${styles.popup} pt-15 pr-10 pl-10 pb-15`}>
        <div className={styles.heading}>
          {title && (
            <h2 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <button
            onClick={() => popupCloseButtonHandler(false)}
            className={styles.closeButton}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </section>
      <ModalOverlay popupCloseButtonHandler={popupCloseButtonHandler} />
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