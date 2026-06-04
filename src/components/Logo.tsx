import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
function Logo(){
    return (
        <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="kissmyfootball" />
            <span className={styles.brandName}>kissmyfootball</span>
        </Link>
    )
}
export default Logo;
