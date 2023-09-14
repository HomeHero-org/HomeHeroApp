import React from "react";
import styles from './ReqNormalCard.module.css';
import requestImage from '../Images/req01.jpg';

const ReqNormalCard = (props) => {
    
    const cardInfoExtHandler = () => {
        props.showExtendInfo();
    }

    return(
        <div className={styles.card} onClick={cardInfoExtHandler}>
            <div className={styles.requestImg}>          
                <img src={props.picture || requestImage} alt="Imagen que describe la solicitud"/>
            </div>
            <div className={styles.requestContent}>
                <h2 className={styles.requestTitle}>{props.infoReq.title}</h2>
                <div className={styles.InfoGroup}>
                    <h6>Ubicación</h6>
                    <p>{props.infoReq.location}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>Heroes Solicitados</h6>
                    <p>{props.infoReq.numHeroes}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>Fecha</h6>
                    <p>{props.infoReq.date}</p>
                </div>
                {/* <div className={styles.InfoGroup}>
                    <h6>Categoria</h6>
                    <p>{props.infoReq.category}</p>
                </div> */}
            </div>
        </div>
    );
}

export default ReqNormalCard;