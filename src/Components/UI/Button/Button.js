import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={`${styles.button} ${styles[props.color]}`} type="submit">
            <i className={props.icon}></i>
            {props.content}
        </button>
    );
};

export default Button;
