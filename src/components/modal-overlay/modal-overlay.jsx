import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { popupClosed } from "../../services/modal-slice";
import { ingredientClickedRemoved } from '../../services/ingredients-slice'


export default function ModalOverlay({ popupCloseButtonHandler }) {

  const dispatch = useDispatch();

  const handleOverlayClick = () => {
    dispatch(popupClosed());
    dispatch(ingredientClickedRemoved());
  }

  return (
    <div
      className={styles.overlay}
      onClick={() => handleOverlayClick()}
    ></div>
  );
}

ModalOverlay.propTypes = {
    popupCloseButtonHandler: PropTypes.func.isRequired,
  };