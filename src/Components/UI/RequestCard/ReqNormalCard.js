import React from "react";
import styles from './ReqNormalCard.module.css';
import RequestDefaultImage from '../../../Images/DefaultRequestIMG.jpg';
import { useTranslation } from 'react-i18next';


const ReqNormalCard = (props) => {
    const { t } = useTranslation();
    const cardInfoExtHandler = () => {
        props.showExtendInfo(true,props.infoReq);
    }

    return(
        <div className={styles.card} onClick={cardInfoExtHandler}>
            <div className={styles.requestImg}>
                <img src={props.picture || RequestDefaultImage} alt="Imagen que describe la solicitud"/>
            </div>
            <div className={styles.requestContent}>
                <h2 className={styles.requestTitle}>{props.infoReq.title}</h2>
                <div className={styles.InfoGroup}>
                    <h6>{t('location')}</h6>
                    <p>{props.infoReq.location}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>{t('heroes_requested')}</h6>
                    <p>{props.infoReq.numHeroes}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>{t('date')}</h6>
                    <p>{props.infoReq.date}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>{t('category')}</h6>
                    <p>{props.infoReq.category}</p>
                </div>
            </div>
        </div>
    );
}

export default ReqNormalCard;