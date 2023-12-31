import React from "react";
import useCtx from "../../../Hooks/useCtx";
import styles from "./HomePage.module.css";
import HomeBanner from "./HomeBanner/HomeBanner";
import AccessButton from "./AccessButton/AccessButton";
import Login_Logo from "../../../Images/Login-Logo.svg";
import Signup_Logo from "../../../Images/Sign-Up-Logo.svg";
import { useLocation , Navigate } from "react-router-dom";
import useRefresherToken from "../../../Hooks/useRefresherToken";
import getRole from "../../../Hooks/getRole";
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const location = useLocation();
    const { token } = useCtx();
    const refresh = useRefresherToken();
    const { t } = useTranslation();
    
    if (token == null) {
        refresh();
    }

    return (
        token ? <Navigate to={`/~/${getRole(token)}/home`} state={{ from: location }} replace/> :
        <section>
            <HomeBanner />
            <div className={styles.accessContent}>
                <AccessButton
                    route="/sign_up"
                    img={Signup_Logo}
                    title={t('register')}
                />
                <AccessButton
                    route="/login"
                    img={Login_Logo}
                    title={t('Log_In')}
                />
            </div>
        </section>
    );
};

export default HomePage;
