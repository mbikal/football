import {  NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
    return (
      <nav className={styles.nav}>
        <ul className={styles.navBar}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
        </ul>
      </nav>
    );   
}
export default NavBar;