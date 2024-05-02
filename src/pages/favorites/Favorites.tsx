import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { favoritesSelector } from "../../core/favoritesSlice";
import FavoriteItem from "../../components/favorite-item";

export default function Favorites() {
  const favorites = useSelector(favoritesSelector);

  return (
    <>
      <h1 className={styles.title}>Избранное</h1>
      {favorites.length ? (
        <article className={styles.cart}>
          <div>
            {favorites.map((item) => (
              <FavoriteItem key={item.id} item={item} />
            ))}
          </div>
        </article>
      ) : (
        <div>Избранное пусто</div>
      )}
    </>
  );
}
