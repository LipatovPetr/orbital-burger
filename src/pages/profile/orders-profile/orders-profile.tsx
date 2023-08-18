import styles from "./orders-profile.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

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

  const ordersReversed = [...orders].reverse();

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

  return ordersReversed ? (
    <>
      <div className={styles.container}>
        {ordersReversed?.map((order) => (
          <OrderCard data={order} isProfile={true} />
        ))}
      </div>
    </>
  ) : (
    <Preloader />
  );
}

export default OrdersProfile;
