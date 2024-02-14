import React from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../core/catalogSlice";
import CartItem from "../../components/cart-item";
import CartTotal from "../../components/cart-total";
import styles from "./styles.module.scss";

export default function Cart() {
  const { cartItems, total } = useSelector(cartSelector);

  return (
    <>
      {cartItems.length ? (
        <article className={styles.cart}>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartTotal total={total} />
        </article>
      ) : (
        <div>Корзина пуста</div>
      )}
    </>
  );
}
