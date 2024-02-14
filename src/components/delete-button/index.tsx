import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import styles from "./styles.module.scss";

type Props = {
  onClick: () => void;
};

export default function DeleteButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className={styles["delete-button"]}>
      <RiDeleteBin2Line />
    </button>
  );
}
