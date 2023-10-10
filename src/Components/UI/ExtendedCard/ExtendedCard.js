import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ExtendedCard.module.css";
import Button from "../Button/Button";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClick} />;
};

const FooterCard = (props) => {
    const [enableConfirm, setEnableConfirm] = useState(false);
    const [valuePost, setValuePost] = useState(0);
    const [currency, setCurrency] = useState('COP');

    const enableConfirmHandler = () => {
        setEnableConfirm(true);
    }

    const getValuePostHandler = (event) => {
        setValuePost(event.target.value);
    }

    const getCurrencyHandler = (event) => {
        setCurrency(event.target.value);
    }

    const postulationHandler = () =>{
        /**
         * ACA VA LO DE ENVIAR A LA BD
         * Variable valuePost tiene el dinero solicitado ya se actualiza solo [pendientes validaciones]
         * Variable currency ya tiene la divisa seleccionada
         */
        props.onClick();
    }

    if (enableConfirm) {
        return (
            <div className={styles.footerCard}>
                <Button
                    onClick={postulationHandler}
                    content="Confirmar"
                    color="blueBtn"
                    icon="fa-solid fa-square-check"
                />
                <input
                    onChange={getValuePostHandler}
                    className={`${styles.customInput} ${styles.bigInput}`}
                    placeholder="Dinero que quieres pedir"
                    type="number"
                    id="valuePost"
                />
                <select
                    onChange={getCurrencyHandler}
                    className={styles.customInput}
                    id="currency"
                >
                    <option value="COP">Pesos COL</option>
                    <option value="USD">Dolares</option>
                    <option value="EUR">Euros</option>
                    <option value="GBP">Libras</option>
                </select>
            </div>
        );
    } else {
        return (
            <div className={styles.footerCard}>
                <Button
                onClick={enableConfirmHandler}
                    content="Postularse"
                    color="blueBtn"
                    icon="fa-solid fa-handshake-angle"
                />
            </div>
        );
    }
};

const Modal = (props) => {
    console.log(props);
    const date = new Date(
        props.infoReq.publicationReqDate
    ).toLocaleDateString();

    const picture= `data:image/jpeg;base64,${props.infoReq.requestPicture}`;

    return (
        <div className={styles.extendedCard}>
            <div className={styles.requestImg}>
                <img
                    src={picture}
                    alt="Imagen que describe la solicitud"
                />
            </div>
            <div className={styles.requestContent}>
                <h2 className={styles.requestTitle}>{props.infoReq.requestTitle}</h2>
                <div className={styles.InfoGroup}>
                    <h6>Ubicación</h6>
                    <p>{props.infoReq.requestLocation}</p>
                </div>
                <div className={`${styles.InfoGroup} ${styles.description}`}>
                    <h6>Descripción</h6>
                    <p>{props.infoReq.requestContent}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>Heroes Solicitados</h6>
                    <p>{props.infoReq.membersNeeded}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>Fecha</h6>
                    <p>{date}</p>
                </div>
                <div className={styles.InfoGroup}>
                    <h6>Categoria</h6>
                    <p>{props.infoReq.requestArea}</p>
                </div>
            </div>
            <FooterCard onClick={props.onClick}/>
        </div>
    );
};

const ExtendedCard = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.clearExtendCard} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <Modal onClick={props.clearExtendCard} infoReq={props.infoReq} />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    );
};

export default ExtendedCard;
