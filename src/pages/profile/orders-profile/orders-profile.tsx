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
import { useAppDispatch, useAppSelector } from "../../../components/app/app";
import Preloader from "../../../components/preloader/preloader";
import {
  connectProfile,
  disconnectProfile,
} from "../../../store/FeedUserOrders/actions";

function OrdersProfile() {
  const dispatch = useAppDispatch();
  const orders =
    useAppSelector((state) => state.userOrders.ordersData?.orders) || [];

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessToken?.substring(7);

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
