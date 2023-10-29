import React, { useState, useEffect, Suspense } from "react";
import styles from "../SearchRequest/SearchRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import LocaleContext from "../../LocaleContext";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const SettingsView = () => {
    function Loading() {
        return (
            <>Loading...</>
        )
    }

    const [locale, setLocale] = useState(i18n.language);
    i18n.on('languageChanged', (lng) => setLocale(i18n.language));
    const { t } = useTranslation();

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    }

    const [selectedLanguage, setSelectedLanguage] = useState(1);

    const [buttonPosition, setButtonPosition] = useState({
        top: '50px',
        right: '50px'
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setButtonPosition({
                    top: '20px',
                    right: '20px'
                });
            } else {
                setButtonPosition({
                    top: '30px',
                    right: '50px'
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        
        <React.Fragment>
            <MainBanner>
                <LocaleContext.Provider value={{ locale, setLocale }}>
                    <Suspense fallback={<Loading />}>
                    
                        <div className={styles.bannerMessage}>
                            <div className={styles.mainMessage}>
                                <h1>{t('settings')}</h1>
                            </div>
                            <QuoteMessage
                                messageHead={t('What_do_you_want_to_attend_to_today')}
                                messagePg={t('What_ever_it_is_we_know_you_will_do_it_well') }
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: buttonPosition.top,
                            right: buttonPosition.right,
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '3px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#ffffff',
                            transition: 'box-shadow 0.3s'
                        }}>
                            <span style={{ marginRight: '8px' }}>{t('Language')}</span>
                            <select
                                value={locale}
                                onChange={handleChange}
                                style={{
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    paddingLeft: '40px',
                                    borderRadius: '5px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    background: `url('data:image/svg+xml,...'), url('./path_to_your_globe_icon.svg')`,
                                    backgroundPosition: 'right 1.5rem center, 1rem center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundSize: '1rem auto, 1.5rem auto',
                                    transition: 'box-shadow 0.3s'
                                }}
                            >
                                <option value="es">{t('language1')}</option>
                                <option value="en">{t('language2')}</option>
                                <option value="po">{t('Portuguese')}</option>
                                <option value="ch">{t('Simplified Chinese')}</option>
                                <option value="fr">{t('French')}</option>
                            </select>
                        </div>
                    </Suspense>
                </LocaleContext.Provider>
            </MainBanner>
            <InfoSection>
            </InfoSection>
        </React.Fragment>
    );
};

export default SettingsView;
