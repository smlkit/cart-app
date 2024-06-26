import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../core/catalogSlice";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import styles from "./styles.module.scss";

const Layout = () => {
  const { amount } = useSelector(cartSelector);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          <div className={styles.flex}>
            <Link
              to="/"
              className={styles["navigation__link"]}
            >
              Каталог
            </Link>
            <div className={styles.sublinks}>
              <Link
                to="/profile"
                className={styles["navigation__link"]}
              >
                <AiOutlineUser />
              </Link>
              <Link
                to="/favorites"
                className={styles["navigation__link"]}
              >
                <GrFavorite />
              </Link>
              <Link
                to="/cart"
                className={styles["navigation__link"]}
              >
                <FiShoppingCart />
              </Link>
              {amount > 0 && (
                <div
                  className={styles["navigation__amount"]}
                >
                  <p>{amount}</p>
                </div>
              )}
            </div>
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
