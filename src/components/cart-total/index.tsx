import React from "react";
import styles from "./styles.module.scss";

type Props = {
  total: number;
};

export default function CartTotal({ total }: Props) {
  return (
    <article className={styles.cart}>
      <h3 className={styles.cart__title}>Корзина</h3>
      <p>Всего: {total} ₽</p>
    </article>
  );
}
