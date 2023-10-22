import React from "react";
import styles from './MessageSlider.module.css';
import { useTranslation } from 'react-i18next';

const MessageSlider = () => {
    const { t } = useTranslation();
    return(
        <div className={styles.messageSlider}>
            <i className={`fa-solid fa-quote-left ${styles.quote}`}></i>
            <i className={`fa-solid fa-angle-left ${styles.angle_left}`}></i>
            <i className={`fa-solid fa-angle-right ${styles.angle_right}`}></i>
            <p>{t('webServicesElevated')}</p>
           
        </div>
    );
};

export default MessageSlider;