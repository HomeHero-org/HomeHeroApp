import React from "react";
import styles from './AccessButton.module.css';
import { useNavigate } from "react-router-dom";

const AccessButton = (props) => {
    const navigate = useNavigate();

    return <div onClick={() => navigate(props.route)} className={styles.accessButton}>
        <h2>{props.title}</h2>
        <div className={styles.imgContainer}>
            <img src={props.img}/>
        </div>
    </div>;
};

export default AccessButton;