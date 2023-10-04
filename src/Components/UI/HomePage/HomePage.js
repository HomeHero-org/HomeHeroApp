import React, {useContext} from "react";
import PageContext from "../../../Store/page-context";
import styles from "./HomePage.module.css";
import HomeBanner from "./HomeBanner/HomeBanner";
import AccessButton from "./AccessButton/AccessButton";
import Login_Logo from "../../../Images/Login-Logo.svg";
import Signup_Logo from "../../../Images/Sign-Up-Logo.svg";

const HomePage = () => {
    const ctx = useContext(PageContext);
    console.log(ctx.isLogged);
    if(ctx.isLogged){
        return <h1> HOLA ESTOY LOGEADO </h1>
    }
    return (
        <section>
            <HomeBanner />
            <div className={styles.accessContent}>
                <AccessButton route="/Signup" img={Signup_Logo} title="Registrarse" />
                <AccessButton route="/Login" img={Login_Logo} title="Iniciar Sesion" />
            </div>
        </section>
    );
};

export default HomePage;
