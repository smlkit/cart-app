import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { TbShoppingBagPlus } from "react-icons/tb";
import { ItemType } from "../../utils/types";
import styles from "./styles.module.scss";
import { removeFavorite } from "../../core/favoritesSlice";
import {
  addItem,
  calculateTotals,
  cartSelector,
  removeItem,
} from "../../core/catalogSlice";

type Props = {
  item: ItemType;
};

export default function FavoriteItem({ item }: Props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector);

  const findItem = cartItems[item.id];

  const handleAddItem = () => {
    dispatch(addItem(item));
    dispatch(calculateTotals());
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
    dispatch(calculateTotals());
  };

  const handleDelete = () => {
    dispatch(removeFavorite(item));
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
      <div className={styles["cart-item__actions"]}>
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
        <button
          onClick={handleDelete}
          className={styles["favorite-button"]}
        >
          <MdFavorite />
        </button>
      </div>
    </div>
  );
}
