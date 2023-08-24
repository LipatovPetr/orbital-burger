import cn from "classnames";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useEffect, ReactNode } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

type ModalProps = {
  children: ReactNode;
  title?: string;
  popupClosed: () => void;
};

function Modal({ children, title, popupClosed }: ModalProps) {
  const rootForModal = document.getElementById("modal");

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        popupClosed();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [popupClosed]);

  const handleCloseButton = () => {
    popupClosed();
  };

  return createPortal(
    <>
      <section className={cn(styles.popup, "pt-15", "pr-10", "pl-10", "pb-15")}>
        <div className={styles.heading}>
          {title && (
            <h2 className={cn(styles.title, "text", "text_type_main-large")}>
              {title}
            </h2>
          )}
        </div>
        <button
          onClick={() => handleCloseButton()}
          className={styles.closeButton}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </section>
      <ModalOverlay popupClosed={popupClosed} />
    </>,
    rootForModal!
  );
}

export default Modal;
