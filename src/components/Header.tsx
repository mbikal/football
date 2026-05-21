import Logo from "./Logo";
import NavBar from "./NavBar";
import styles from "./Header.module.css";
function Header(){
    return (
        <header className={styles.header}>
            <Logo />
            <NavBar />
        </header>
    )       
}
export default Header;