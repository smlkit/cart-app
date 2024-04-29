import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { TbShoppingBagPlus } from "react-icons/tb";
import {
  cartSelector,
  removeItem,
} from "../../core/catalogSlice";
import {
  addItem,
  calculateTotals,
} from "../../core/catalogSlice";
import { ItemType } from "../../utils/types";
import styles from "./styles.module.scss";

type AddButtonProps = {
  item: ItemType;
};

export default function AddButton({
  item,
}: AddButtonProps) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector);

  const findItem = cartItems[item.id];

  const handleAddItem = () => {
    console.log(cartItems[item.id]);
    dispatch(addItem(item));
    dispatch(calculateTotals());
  };

  const handleRemoveItem = () => {
    console.log(cartItems[item.id]);
    dispatch(removeItem(item.id));
    dispatch(calculateTotals());
  };

  return (
    <>
      {!findItem ? (
        <button
          onClick={handleAddItem}
          className={styles.button}
        >
          <p>
            <TbShoppingBagPlus />
          </p>
        </button>
      ) : (
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
        </div>
      )}
    </>
  );
}
