import styles from "./orders-profile.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCard from "../../../components/order-card/order-card";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../components/preloader/preloader";
import {
  connectProfile,
  disconnectProfile,
} from "../../../services/FeedUserOrders/actions";

const mockData = {
  _id: "64b2b6a082e277001bf8f878",
  ingredients: [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa093d",
  ],
  status: "done",
  name: "Space флюоресцентный spicy бургер",
  createdAt: "2023-07-15T15:09:20.425Z",
  updatedAt: "2023-07-15T15:09:20.544Z",
  number: 12669,
};

function OrdersProfile() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrders.orders.orders) || [];

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessToken.substring(7);

  useEffect(() => {
    dispatch(
      connectProfile(
        `wss://norma.nomoreparties.space/orders?token=${accessTokenWithoutBearer}`
      )
    );
    return () => {
      dispatch(disconnectProfile());
    };
  }, []);

  return orders?.length < 1 ? (
    <Preloader />
  ) : (
    <>
      <div className={styles.container}>
        {[...orders]?.reverse().map((order) => (
          <OrderCard data={order} isProfile={true} />
        ))}
      </div>
    </>
  );
}

export default OrdersProfile;
