import React from "react";
import styles from "./QuoteMessage.module.css";
import QuoteImg from "../Images/holding-hand.png";

const QuoteMessage = () => {
    return (
        <div className={styles.Quote}>
            <div className={styles.QuoteImg}>
                <img src={QuoteImg} alt="Imagen de acompañamiento" />
            </div>
            <div className={styles.QuoteMessage}>
                <h6>Cuando pides en HomeHero</h6>
                <p>"Alguien te atendera seguro"</p>
            </div>
        </div>
    );
};

export default QuoteMessage;
