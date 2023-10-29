import React from "react";
import styles from "./CreateRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import CreateForm from "../../Components/CreateForm/CreateForm";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import { useTranslation } from 'react-i18next';
const CreateRequest = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>{t('creation1')}</h1>
                        <h2> {t('of_request')} </h2>
                    </div>
                    <QuoteMessage messageHead={t('order_from_homehero')} messagePg={t('surely_assist')} />
                </div>
                <CreateForm />
            </MainBanner>
            <InfoSection>

            </InfoSection>
        </React.Fragment>
    );
}

export default CreateRequest;
