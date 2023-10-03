import React from "react";
import styles from './MessageSlider.module.css';

const MessageSlider = () => {
    return(
        <div className={styles.messageSlider}>
            <i className={`fa-solid fa-quote-left ${styles.quote}`}></i>
            <i className={`fa-solid fa-angle-left ${styles.angle_left}`}></i>
            <i className={`fa-solid fa-angle-right ${styles.angle_right}`}></i>
            <p>Una Web que lleva los servicios a otro nivel</p>
        </div>
    );
};

export default MessageSlider;