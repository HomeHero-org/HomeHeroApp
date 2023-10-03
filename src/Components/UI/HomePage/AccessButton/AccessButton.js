import React from "react";
import styles from './AccessButton.module.css';

const AccessButton = (props) => {
    return <div className={styles.accessButton}>
        <h2>{props.title}</h2>
        <div className={styles.imgContainer}>
            <img src={props.img}/>
        </div>
    </div>;
};

export default AccessButton;