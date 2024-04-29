import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import styles from "./styles.module.scss";
import { ItemType } from "../../utils/types";
import {
  addFavorite,
  favoritesSelector,
  removeFavorite,
} from "../../core/favoritesSlice";

type Props = {
  item: ItemType;
};

export default function FavoriteButton({ item }: Props) {
  const favorites = useSelector(favoritesSelector);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(
    !!favorites.find((el) => el.id === item.id)
  );

  const handleAddFavorite = () => {
    dispatch(addFavorite(item));
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(item));
    setIsFavorite(false);
  };

  return (
    <>
      {isFavorite ? (
        <button
          onClick={handleRemoveFavorite}
          className={styles["favorite-button"]}
        >
          <MdFavorite />
        </button>
      ) : (
        <button
          onClick={handleAddFavorite}
          className={styles["favorite-button"]}
        >
          <MdFavoriteBorder />
        </button>
      )}
    </>
  );
}
