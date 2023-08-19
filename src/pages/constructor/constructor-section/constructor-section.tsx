import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../components/app/app";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../../../components/modal/modal";
import styles from "./constructor-section.module.css";
import CheckoutDetails from "../../../components/modal/checkout-details/checkout-details";
import IngredientsList from "./ingredients-list/ingredients-list";
import {
  checkoutPopupOpened,
  checkoutPopupClosed,
} from "../../../store/slices/popup-checkout-details/popup-checkout-details";
import { postData } from "../../../store/slices/order/order";
import { clearConstructor } from "../../../store/slices/burger-constructor/burger-constructor";
import { useEffect } from "react";

function ConstructorSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.order.totalPrice);
  const orderData = useAppSelector((state) => state.order.orderList);
  const orderPopupIsOpen = useAppSelector(
    (state) => state.checkoutPopup.opened
  );
  const chosenBun = useAppSelector((state) => state.burgerConstructor.bun);
  const isUserLogged = useAppSelector((state) => state.user.user);
  const orderStatus = useAppSelector((state) => state.order.status);
  const chosenStuffings = useAppSelector(
    (state) => state.burgerConstructor.stuffings
  );

  useEffect(() => {
    if (orderStatus === "succeeded") {
      dispatch(clearConstructor());
    }
  }, [orderStatus]);

  const handleOrderClick = () => {
    if (!isUserLogged) {
      return navigate("/login", {
        state: { routeMessage: "Сначала авторизируйтесь" },
      });
    }
    dispatch(postData(orderData));
    dispatch(checkoutPopupOpened());
  };

  return (
    <div className={styles.section}>
      <IngredientsList />
      <div className={cn(styles.orderInfo, "mt-10", "mr-4")}>
        <div className={cn("mr-10")}>
          <span
            className={cn(styles.priceValue, "text text_type_digits-medium")}
          >
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!chosenBun || chosenStuffings!.length === 0}
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {orderPopupIsOpen && (
        <Modal popupClosed={() => dispatch(checkoutPopupClosed())}>
          <CheckoutDetails />
        </Modal>
      )}
    </div>
  );
}

export default ConstructorSection;
