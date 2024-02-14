import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../core/catalogSlice";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import styles from "./styles.module.scss";

const Layout = () => {
  const { amount } = useSelector(cartSelector);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          <div className={styles.flex}>
            <Link to="/" className={styles["navigation__link"]}>
              Каталог
            </Link>
            <Link to="/cart" className={styles["navigation__link"]}>
              <HiOutlineShoppingCart />
            </Link>
            {amount > 0 && (
              <div className={styles["navigation__amount"]}>
                <p>{amount}</p>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;