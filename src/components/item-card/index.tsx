import React from "react";
import { ItemType } from "../../utils/types";
import AddButton from "../add-button";
import styles from "./style.module.scss";

type ItemCardProps = {
  item: ItemType;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <article className={styles["item-card"]}>
      <div className={styles["item-card__image"]}>
        <img src={item.image} alt="item image" />
      </div>
      <div className={styles.flex}>
        <div>
          <p className={styles["item-card__price"]}>{item.price} ₽</p>
          <p className={styles["item-card__name"]}>{item.name}</p>
        </div>
        <AddButton item={item} />
      </div>
    </article>
  );
}
