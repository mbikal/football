import styles from "./Footer.module.css";
function Footer(){
    const year = new Date().getFullYear();
    return(
        <footer className={styles.footer}>
            <p>© {year} KissMyFootball App. All rights reserved.</p>
        </footer>
    )
}
export default Footer;