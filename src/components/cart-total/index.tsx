import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  HistoryOrderType,
  submitOrder,
} from "../../core/historySlice";
import {
  CartItem,
  clearCart,
} from "../../core/catalogSlice";
import styles from "./styles.module.scss";

type Props = {
  total: number;
  items: CartItem[];
};

export default function CartTotal({ total, items }: Props) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(
      2,
      "0"
    );
    const month = String(
      currentDate.getMonth() + 1
    ).padStart(2, "0");
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(
      2,
      "0"
    );
    const minutes = String(
      currentDate.getMinutes()
    ).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

    const data: HistoryOrderType = {
      status: "Сформирован",
      date: formattedDate,
      address,
      items,
      total,
    };
    dispatch(submitOrder(data));
    dispatch(clearCart());
  };

  return (
    <article className={styles.cart}>
      <h3 className={styles.cart__title}>Корзина</h3>
      <p>
        Всего:{" "}
        <span className={styles.total}>{total} ₽</span>
      </p>
      <div className={styles.form}>
        <div>
          <p>Полное имя:</p>
          <input
            type="text"
            placeholder="Иван Иванович Иванов"
            className={styles.input}
          />
        </div>
        <div>
          <p>Телефон:</p>
          <input
            type="tel"
            placeholder="+79998887766"
            className={styles.input}
          />
        </div>
        <div>
          <p>Адрес доставки:</p>
          <input
            type="tel"
            placeholder="Таганрог, ул. Шевченко 1, кв. 72"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Card Number"
            className={styles.input}
          />
          <div className={styles.card}>
            <input
              type="date"
              placeholder="Valid"
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="CVC"
              className={styles.input}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className={styles.buy}
        >
          Оплатить {total}₽
        </button>
      </div>
    </article>
  );
}
