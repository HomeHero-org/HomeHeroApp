import React from "react";
import styles from "./HomePage.module.css";
import HomeBanner from "./HomeBanner/HomeBanner";
import AccessButton from "./AccessButton/AccessButton";
import Login_Logo from "../../../Images/Login-Logo.svg";
import Signup_Logo from "../../../Images/Sign-Up-Logo.svg";

const HomePage = () => {

    return (
        <section>
            <HomeBanner />
            <div className={styles.accessContent}>
                <AccessButton route="/signup" img={Signup_Logo} title="Registrarse" />
                <AccessButton route="/login" img={Login_Logo} title="Iniciar Sesion" />
            </div>
        </section>
    );
};

export default HomePage;
