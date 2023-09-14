import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ExtendedCard.module.css";
import Button from "./UI/Button";
import axios from "axios";
import { API_ENDPOINT } from "../config";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const FooterCard = (props) => {
  const [enableConfirm, setEnableConfirm] = useState(false);
  const [valuePost, setValuePost] = useState(0);
  const [currency, setCurrency] = useState("COP");

  const enableConfirmHandler = () => {
    setEnableConfirm(true);
  };


  const postulationHandler = async () => {
    const formData = new FormData();
    formData.append("UserID_Application", 1);
    formData.append("RequestID_Application", 1);
    formData.append("RequestedPrice", parseFloat(valuePost));

    try {
      const response = await axios.post(`${API_ENDPOINT}Application`, formData);
      if (response.status === 200) {
        console.log("Postulación enviada con éxito!");
      }
    } catch (error) {
      console.error("Error al enviar la postulación:", error.message);
    }

    if (typeof props.onClick === "function") {
        props.onClick();
    }
  };

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
          className={`${styles.customInput} ${styles.bigInput}`}
          placeholder="Dinero que quieres pedir"
          type="number"
          id="valuePost"
          onChange={(e) => setValuePost(e.target.value)}
        />
        <select
          // onChange={getCurrencyHandler}
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
  return (
    <div className={styles.extendedCard}>
      <div className={styles.requestImg}>
      <img src={props.picture} alt="Extended Request" />
      </div>
      <div className={styles.requestContent}>
        <h2 className={styles.requestTitle}>{props.infoReq.title}</h2>
        <div className={styles.InfoGroup}>
          <h6>Ubicación</h6>
          <p>{props.infoReq.location}</p>
        </div>
        <div className={`${styles.InfoGroup} ${styles.description}`}>
          <h6>Descripción</h6>
          <p>{props.infoReq.description}</p>
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
      <FooterCard onClick={props.onClick} />
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
                <Modal onClick={props.clearExtendCard}  picture={props.picture} infoReq={props.infoReq} />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    );
};


export default ExtendedCard;
