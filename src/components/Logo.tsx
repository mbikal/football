import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Logo.module.css";
function Logo(){
    return (
        <Link to="/" className={styles.logo}>
            <img src={logo} alt="logo" />
        </Link>
    )
}
export default Logo;
