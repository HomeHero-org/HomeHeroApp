import React from "react";
import styles from "./SearchRequest.module.css";
import MainBanner from "./UI/MainBanner";
import QuoteMessage from "./UI/QuoteMessage";
import InfoSection from "./UI/InfoSection";

const ComplaintView = () => {

    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>ComplaintView</h1>
                        <h2>'El diseño pendiente'</h2>
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

export default ComplaintView;
