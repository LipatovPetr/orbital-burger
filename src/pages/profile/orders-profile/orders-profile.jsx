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
  return (
    <>
      <div className={styles.container}>
        <OrderCard data={mockData} />
        <OrderCard data={mockData} />
        <OrderCard data={mockData} />
        <OrderCard data={mockData} />
      </div>
    </>
  );
}

export default OrdersProfile;
