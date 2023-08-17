import styles from "./orders.module.css";
import OrderCard from "../../components/order-card/order-card";
import cn from "classnames";
import { useEffect, useMemo } from "react";
import { connect, disconnect } from "../../store/FeedAllOrders/actions";
import { useAppDispatch, useAppSelector } from "../../components/app/app";
import Preloader from "../../components/preloader/preloader";

function Orders() {
  const dispatch = useAppDispatch();
  const ordersData =
    useAppSelector((state) => state.allOrders.ordersData)! || [];

  const { orders, total, totalToday } = ordersData;

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const filteredOrders = useMemo(
    () =>
      orders?.filter((order) => {
        return order._id && order.number && order.ingredients.length >= 3;
      }),
    [orders]
  );

  const completedOrders = useMemo(
    () => filteredOrders?.filter((order) => order.status === "done") || [],
    [filteredOrders]
  );

  const processedOrders = useMemo(
    () => filteredOrders?.filter((order) => order.status === "pending") || [],
    [filteredOrders]
  );

  return ordersData ? (
    <div className={styles.content}>
      <h1 className={styles.heading}>Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.ordersFeed}>
          {filteredOrders?.map((order) => (
            <OrderCard data={order} key={order._id} />
          ))}
        </div>
        <div className={styles.dashboard}>
          <div className={styles.statusContainer}>
            <div className={styles.completedOrders}>
              <h3 className={styles.dashboardSubtitle}>Готовы:</h3>
              <div className={cn(styles.list, styles.completedList)}>
                {completedOrders?.length < 5 ? (
                  completedOrders.map((order) => (
                    <div key={order._id}>{order.number}</div>
                  ))
                ) : (
                  <>
                    <div>
                      {completedOrders.slice(0, 5).map((order) => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                    </div>
                    <div>
                      {completedOrders.slice(5, 10).map((order) => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.processedOrders}>
              <h3 className={styles.dashboardSubtitle}>В работе:</h3>
              <div className={styles.list}>
                {processedOrders?.length < 5 ? (
                  processedOrders.map((order) => (
                    <div key={order._id}>{order.number}</div>
                  ))
                ) : (
                  <>
                    <div>
                      {processedOrders.slice(0, 5).map((order) => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                    </div>
                    <div>
                      {processedOrders.slice(5, 10).map((order) => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <h3 className={styles.dashboardTitle}>Выполнено за все время</h3>
          <h3 className={styles.largeDigits}>{total}</h3>
          <h3 className={styles.dashboardTitle}>Выполнено за сегодня</h3>
          <h3 className={styles.largeDigits}>{totalToday}</h3>
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
}

export default Orders;
