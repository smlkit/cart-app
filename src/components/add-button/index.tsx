import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../core/catalogSlice";
import { addItem, calculateTotals } from "../../core/catalogSlice";
import { ItemType } from "../../utils/types";
import styles from "./styles.module.scss";

type AddButtonProps = {
  item: ItemType;
};

export default function AddButton({ item }: AddButtonProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(cartSelector);

  const findItem = cartItems.find((el) => el.id === item.id);

  const handleAddItem = () => {
    dispatch(addItem(item));
    dispatch(calculateTotals());
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      {!findItem ? (
        <button onClick={handleAddItem} className={styles.button}>
          Купить
        </button>
      ) : (
        <button onClick={handleGoToCart} className={styles.button}>
          Оформить заказ
        </button>
      )}
    </>
  );
}
