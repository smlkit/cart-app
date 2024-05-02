import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { historySelector } from "../../core/historySlice";

export default function Profile() {
  const history = useSelector(historySelector);

  return (
    <>
      <h1 className={styles.title}>История заказов</h1>
      <div className={styles.container}>
        {history.map((order, index) => (
          <div
            key={index}
            className={styles["history-card"]}
          >
            <p className={styles.status}>{order.status}</p>
            <p className={styles.date}>{order.date}</p>
            <p className={styles.address}>
              {order.address}
            </p>
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.item}>
                <p>{item.item.name}</p>
                <div>X {item.itemAmount}</div>
              </div>
            ))}
            <p className={styles.total}>{order.total} ₽</p>
          </div>
        ))}
      </div>
    </>
  );
}
