import React from "react";
import styles from './Navbar.module.css';
import userPf1 from '../Images/userPf1.jpg';
const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <i className={`fa-solid fa-bars fa-2x`}></i>
            <i className={`fa-solid fa-house fa-2x`}></i>
            <h1>Home Hero</h1>
            <div className={styles.userImg}>
                <img src={userPf1} alt="User Profile Photo"/>
            </div>
        </nav>
    );
}
export default Navbar;