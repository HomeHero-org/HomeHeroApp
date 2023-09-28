import React from "react";
import styles from './Navbar.module.css';
import userPf1 from '../Images/userPf1.jpg';
const Navbar = (props) => {
    return (
        <nav className={styles.navbar}>
            <i onClick={props.collapseMenuHandler} className={`fa-solid fa-bars fa-2x`}></i>
            <h1>Home Hero</h1>
        </nav>
    );
}
export default Navbar;