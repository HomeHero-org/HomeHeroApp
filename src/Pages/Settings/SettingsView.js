import React, { useState } from "react";
import styles from "../SearchRequest/SearchRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";

const SettingsView = () => {

    const [selectedLanguage,setSelectedLanguage] = useState(1);
    console.log("el idioma es: ",selectedLanguage);
    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Settings</h1>
                        <h2>'El diseño pendiente'</h2>
                    </div>
                    <QuoteMessage
                        messageHead="¿Que deseas atender hoy?"
                        messagePg='"Lo que sea sabemos que lo harás bien"'
                    />
                </div>
                <div className={`${styles.input_group} ${styles.select_group}`}>
                    <label>IDIOMA</label>
                    <select
                    className={styles.customInput}
                    id="categoria"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="0" disabled>
                        IDIOMA
                    </option>
                    <option value="1">Español</option>
                    <option value="2">Ingles</option>
                </select>
                </div>
            </MainBanner>
            <InfoSection>
            </InfoSection>
        </React.Fragment>
    );
};

export default SettingsView;
