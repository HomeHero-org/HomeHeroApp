import React from "react";
import styles from "../SearchRequest/SearchRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";

const TutorialsView = () => {

    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Tutoriales</h1>
                        <h2> 'El diseño pendiente'</h2>
                    </div>
                    <QuoteMessage
                        messageHead="¿Que deseas atender hoy?"
                        messagePg='"Lo que sea sabemos que lo harás bien"'
                    />
                </div>
                <div className={styles.filters}>
                </div>
            </MainBanner>
            <InfoSection>
            </InfoSection>
        </React.Fragment>
    );
};

export default TutorialsView;
