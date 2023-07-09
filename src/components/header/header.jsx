import { NavLink } from "react-router-dom";
import cn from "classnames";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.navContainer}>
      <nav className={styles.navElement}>
        <div className={styles.navContent}>
          <div className={styles.navSubsection}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <BurgerIcon type="secondary" />
              <span className={cn("ml-2")}>Constructor</span>
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <ListIcon type="secondary" />
              <span className={cn("ml-2")}>Orders</span>
            </NavLink>
          </div>

          <div className={`${styles.navSubsection} ${styles.navLogo}`}>
            <Logo />
          </div>

          <div className={`${styles.navSubsection} ${styles.navProfile}`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <ProfileIcon type="secondary" />
              <span className={cn("ml-2")}>Profile</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
