import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../../core/store";
import { fetchCatalog, fetchCatalogSelector } from "../../core/catalogSlice";
import ItemCard from "../../components/item-card";
import styles from "./styles.module.scss";
import { StatusOfRequestEnum } from "../../utils/types";

export default function Catalog() {
  const { data: catalog, status, error } = useSelector(fetchCatalogSelector);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  return (
    <div className={styles.grid}>
      {catalog &&
        !error &&
        status === StatusOfRequestEnum.SUCCESS &&
        catalog.map((item) => <ItemCard item={item} key={item.id} />)}
    </div>
  );
}
