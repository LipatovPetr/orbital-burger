import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  popupClosed: () => void;
};

export default function ModalOverlay({ popupClosed }: ModalOverlayProps) {
  const handleOverlayClick = () => {
    popupClosed();
  };

  return <div className={styles.overlay} onClick={handleOverlayClick}></div>;
}
