import React from "react";
import styles from './Navbar.module.css';
const Navbar = (props) => {
    return (
        <nav className={styles.navbar}>
            <i onClick={props.collapseMenuHandler} className={`fa-solid fa-bars fa-2x`}></i>
            <h1 className={props.isCollapseMenu ? undefined : styles.hidden}>Home Hero</h1>
        </nav>
    );
}
export default Navbar;