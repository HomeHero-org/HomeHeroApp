import React, { useState } from "react";
import styles from "./CreateRequest.module.css";
import MainBanner from "./UI/MainBanner";
import QuoteMessage from "./UI/QuoteMessage";
import CreateForm from "./CreateForm";
import InfoSection from "./UI/InfoSection";
import ReqNormalCard from "./UI/ReqNormalCard";
import ExtendedCard from "./UI/ExtendedCard";

/** IMAGENES DE LOS REQUESTS DE PRUEBA
 */
import req01 from "../Images/req01.jpg";

const CreateRequest = () => {
    /* Consultar la informacion*/

    const infoReq = {
        title: "Titulo Solicitud #1 de almenos varias lineas",
        description:
            "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
        location: "Municipio",
        numHeroes: "##",
        date: "##/##/####",
        category: "Nombre Categoria",
        image: req01,
    };

    const [isShowCard, setShowCard] = useState(false);
    const [isShowExtendCard, setShowExtendCard] = useState(false);

    const onShowCard = (info) => {
        setShowCard(info);
    };
    const showExtendInfo = (info) => {
        setShowExtendCard(info);
        document.body.style.overflow = "hidden";
    };

    const clearExtendCard = () => {
        setShowExtendCard(false);
        document.body.style.overflow = "auto";
    };

    return (
        <React.Fragment>
            {isShowExtendCard && (
                <ExtendedCard
                    infoReq={infoReq}
                    clearExtendCard={clearExtendCard}
                />
            )}
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Creacion</h1>
                        <h2>de solicitud</h2>
                    </div>
                    <QuoteMessage messageHead="Cuando pides en HomeHero" messagePg="Alguien te atendera seguro" />
                </div>
                <CreateForm onShowCard={onShowCard} />
            </MainBanner>
            <InfoSection>
                {isShowCard && (
                    <ReqNormalCard
                        infoReq={infoReq}
                        showExtendInfo={showExtendInfo}
                    />
                )}
            </InfoSection>
        </React.Fragment>
    );
}

export default CreateRequest;
