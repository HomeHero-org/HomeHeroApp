import React from "react";
import styles from "./CreateRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import CreateForm from "../../Components/CreateForm/CreateForm";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";

const CreateRequest = () => {

    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Creacion</h1>
                        <h2>de solicitud</h2>
                    </div>
                    <QuoteMessage messageHead="Cuando pides en HomeHero" messagePg="Alguien te atendera seguro" />
                </div>
                <CreateForm />
            </MainBanner>
            <InfoSection>

            </InfoSection>
        </React.Fragment>
    );
}

export default CreateRequest;
