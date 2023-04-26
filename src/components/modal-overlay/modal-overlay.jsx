import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ popupCloseButtonHandler }) {
  return (
    <div
      className={styles.overlay}
      onClick={() => popupCloseButtonHandler(false)}
    ></div>
  );
}

ModalOverlay.propTypes = {
    popupCloseButtonHandler: PropTypes.func.isRequired,
  };