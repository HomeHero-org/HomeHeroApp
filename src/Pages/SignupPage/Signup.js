import React, {useState,useContext} from "react";
import PageContext from "../../Store/page-context";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import SignupImg from "../../Images/Sign-Up-Logo.svg";
const Signup = () => {
    const navigate = useNavigate();
    const [isRemember, setRemember] = useState(false);
    const setRememberHandler = () => {
        setRemember((prevState) => !prevState);
    };
    const ctx = useContext(PageContext);
    const loginHandler = (event) => {
        event.preventDefault();
        ctx.onSetLogged(true);
        navigate("/");
    };

    return (
        <div className={styles.main_container}>
            <form onSubmit={loginHandler} className={styles.login_form}>
                <h2>REGISTRO</h2>
                <div className={styles.input_group}>
                    <label>NOMBRES</label>
                    <input
                        type="text"
                        placeholder='"Escribe tus nombres aquí"'
                    ></input>
                </div>
                <div className={styles.input_group}>
                    <label>APELLIDOS</label>
                    <input
                        type="text"
                        placeholder='"Escribe tus apellidos aquí"'
                    ></input>
                </div>
                <div className={styles.input_group}>
                    <label>CORREO</label>
                    <input
                        type="email"
                        placeholder="Ejemplo@ejemplo.com"
                    ></input>
                </div>
                <div className={styles.input_group}>
                    <label>CIUDAD DONDE VIVES</label>
                    <select
                    className={styles.customInput}
                    id="ciudad"
                >
                    <option value="0" disabled>
                        Ciudad
                    </option>
                    <option value="1">Facatativa</option>
                    <option value="2">San Juan</option>
                    <option value="3">Bogota</option>
                    <option value="4">Madrid</option>
                </select>
                </div>
                <div className={styles.input_group}>
                    <label>CONTRASEÑA</label>
                    <input type="password" placeholder="********"></input>
                </div>
                <div className={styles.input_group}>
                    <label>CONFIRMAR CONTRASEÑA</label>
                    <input type="password" placeholder="********"></input>
                </div>
                <button className={`${styles.btn_group} ${styles.login_btn}`}>
                    <i className="fa-solid fa-user-plus"></i>
                    <span>Registrarse</span>
                </button>
                <div className={styles.signup_option}>
                    <label>¿Ya estas registrado?</label>
                    <button className={`${styles.btn_group} ${styles.signup_btn}`}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <span>Iniciar Sesión</span>
                    </button>
                </div>
            </form>
            <div className={styles.img_container}>
                <img src={SignupImg} />
            </div>
        </div>
    );
};

export default Signup;
