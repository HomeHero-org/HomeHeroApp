import React from "react";
import styles from "./QuoteMessage.module.css";
import QuoteImg from "../../../Images/holding-hand.png";

const QuoteMessage = (props) => {
    return (
        <div className={styles.Quote}>
            <div className={styles.QuoteImg}>
                <img src={QuoteImg} alt="Imagen de acompañamiento" />
            </div>
            <div className={styles.QuoteMessage}>
                <h6>{props.messageHead}</h6>
                <p>{props.messagePg}</p>
            </div>
        </div>
    );
};

export default QuoteMessage;
