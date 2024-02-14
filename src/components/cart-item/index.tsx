import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, calculateTotals } from "../../core/catalogSlice";
import { ItemType } from "../../utils/types";
import DeleteButton from "../delete-button";
import styles from "./styles.module.scss";

type Props = {
  item: ItemType;
};

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeItem(item.id));
    dispatch(calculateTotals());
  };

  return (
    <div className={styles["cart-item"]}>
      <div>
        <div className={styles["cart-item__image"]}>
          <img src={item.image} alt="item image" />
        </div>
        <div className={styles["flex"]}>
          <p className={styles["cart-item__price"]}>{item.price} ₽</p>
          <p className={styles["cart-item__name"]}>{item.name}</p>
        </div>
      </div>
      <DeleteButton onClick={handleDelete} />
    </div>
  );
}
