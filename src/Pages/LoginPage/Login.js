import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import PageContext from "../../Store/page-context";
import styles from "./Login.module.css";
import loginImg from "../../Images/Login-Logo.svg";
const Login = () => {
    const navigate = useNavigate();
    const [isRemember,setRemember] = useState(false);
    const setRememberHandler = () => {
        setRemember((prevState) => !prevState);
    }
    const ctx = useContext(PageContext);
    const loginHandler = (event) => {
        event.preventDefault();
        ctx.onSetLogged(true);
        navigate("/");
    };

    return (
        <div className={styles.main_container}>
            <form onSubmit={loginHandler} className={styles.login_form}>
                <h2>Inicio de Sesión</h2>
                <div className={styles.input_group}>
                    <label>CORREO</label>
                    <input
                        type="email"
                        placeholder="Ejemplo@ejemplo.com"
                    ></input>
                </div>
                <div className={styles.input_group}>
                    <label>CONTRASEÑA</label>
                    <input type="password" placeholder="********"></input>
                    <span>Olvidaste tu contraseña?</span>
                </div>
                <div className={styles.remember_validation}>
                    <label>¿Recordar inicio de sesión?</label>
                    <div onClick={setRememberHandler} className={styles.checkbox}>
                        <i className={`fa-solid fa-check ${isRemember ? styles.check : styles.no_check}`}></i>
                    </div>
                </div>
                <button className={`${styles.btn_group} ${styles.login_btn}`}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Iniciar Sesion</span>
                </button>
                <div className={styles.signup_option}>
                    <label>¿No estas registrado?</label>
                    <button className={`${styles.btn_group} ${styles.signup_btn}`}>
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Registrarse</span>
                    </button>
                </div>
            </form>
            <div className={styles.img_container}>
                <img src={loginImg}/>
            </div>
        </div>
    );
};

export default Login;
