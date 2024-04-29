import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {
  removeItem,
  calculateTotals,
  cartSelector,
  addItem,
} from "../../core/catalogSlice";
import { ItemType } from "../../utils/types";
import DeleteButton from "../delete-button";
import styles from "./styles.module.scss";

type Props = {
  item: ItemType;
};

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector);

  const handleAddItem = () => {
    dispatch(addItem(item));
    dispatch(calculateTotals());
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
    dispatch(calculateTotals());
  };

  const handleClearItem = () => {
    console.log("clear");
  };

  return (
    <div className={styles["cart-item"]}>
      <div>
        <div className={styles["cart-item__image"]}>
          <img src={item.image} alt="item image" />
        </div>
        <div className={styles["flex"]}>
          <p className={styles["cart-item__price"]}>
            {item.price} ₽
          </p>
          <p className={styles["cart-item__name"]}>
            {item.name}
          </p>
        </div>
      </div>
      <div className={styles.amount__container}>
        <button
          onClick={handleRemoveItem}
          className={styles.amount}
        >
          <CiCircleMinus />
        </button>
        <span>
          <b>{cartItems[item.id].itemAmount}</b>
        </span>
        <button
          onClick={handleAddItem}
          className={styles.amount}
        >
          <CiCirclePlus />
        </button>
        <DeleteButton onClick={handleClearItem} />
      </div>
    </div>
  );
}
