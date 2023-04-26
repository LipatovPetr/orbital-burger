import React from "react";
import cn from "classnames";
import { useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientsList from "../ingredients-list/ingredients-list";
import { postData } from "../../utils/api.js";

function BurgerConstructor() {
  const [orderPopupIsOpen, setOrderPopupOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [checkOutData, setCheckOutData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOrderClick = () => {
    postData('https://norma.nomoreparties.space/api/orders', orderData)
      .then(response => response.json())
      .then(data => {
        setCheckOutData(data); 
        setOrderPopupOpen(data.success); 
      })
      .catch(error => console.error(error));
  };

  return (
    <div className={styles.section}>
      <IngredientsList
        setTotalPrice={setTotalPrice}
        setOrderData={setOrderData}
      />
      <div className={cn(styles.orderInfo, "mt-10", "mr-4")}>
        <div className={styles.priceContainer + " mr-10"}>
          <span className={styles.priceValue + " text text_type_digits-medium"}>
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>

      {orderPopupIsOpen && (
        <Modal popupCloseButtonHandler={setOrderPopupOpen}>
          <OrderDetails checkOutData={checkOutData} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
