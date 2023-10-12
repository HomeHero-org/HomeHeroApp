import React, { useState, useReducer, useEffect } from "react";
import useCtx from "../../Hooks/useCtx";
import getRole from "../../Hooks/getRole";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import loginImg from "../../Images/Login-Logo.svg";

/** Login Validation Function inserted in the useReducer
 *
 * @param {*} state Provides the last values of the object returnet for 'LoginData' useReducer function
 * @param {*} action Provides the current values set in the last call to the useReducer Function
 * @returns //Returns an object with the user information for can login {Password, Email}
 */
const LoginValitadion = (state, action) => {
    //#region Regular Expressions for validations
    const emailValidation =
        /^[a-zA-Z0-9._%+-]{3,30}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,}$/;
    const pwdValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //#endregion
    //set a Email data and validate its data
    if (action.type === "EMAIL_INPUT") {
        const data = {
            ...state,
            email: {
                value: action.val,
                isValid: emailValidation.test(action.val),
            },
        };
        return data;
    }
    //set a Password data and validate its data
    if (action.type === "PWD_INPUT") {
        const data = {
            ...state,
            password: {
                value: action.val,
                isValid: pwdValidation.test(action.val),
            },
        };
        return data;
    }
    return { ...state };
};

/**Login Page Component charged in route /login
 * 
 * @returns a component composed to the login form with Email and Password inputs, and an Image as login banner
 */
const Login = () => {
    const ctx = useCtx();
    const navigate = useNavigate();
    //const location = useLocation();
    //const from = location.state?.from?.pathname || '/'; -> for take the url clicked before to access to login url

    //use Reducer for management of the login data
    const [loginData, setLoginData] = useReducer(LoginValitadion, {
        email: {
            value: null,
            isValid: false,
        },
        password: {
            value: null,
            isValid: false,
        },
    });
    //use State for set error messages
    const [errorMessage, setErrorMessage] = useState();

    const setRememberHandler = () => {
        ctx.setRememberLogin((prevState) => !prevState);
    };
    //event handler for onSubmit
    const loginHandler = (event) => {
        event.preventDefault();
        //navigate(from, {replace: true}); // -> this is the way for charge a url clicked for the user before to access at login view
        ctx.onSetForm({
            Email: loginData.email.value,
            Password: loginData.password.value,
            RememberLogin: ctx.remeberLogin,
        });
        ctx.onSetRequestAction("LOGIN");
    };

    /**UseEffect for manage the possible status response of login action
     * Status Response 400 -> Had bad information passed to login Http Request
     * Status Response 200 -> Login success
     */
    useEffect(() => {
        if (ctx.statusResponse === 400) {
            setErrorMessage("Email o Contraseña incorrecta");
        }
        if (ctx.statusResponse === 200) {
            navigate(`/~/${getRole(ctx.token)}/home`, { replace: true });
            ctx.setstatusResponse(null);
        }
    }, [ctx.statusResponse]);

    //#region useStates and function for managing the aria labedly showed as extra information
    const [isEmailFocus, setEmailFocus] = useState({
        style: false,
        add: false,
    });
    const [isPasswordFocus, setPasswordFocus] = useState({
        style: false,
        add: false,
    });

    const onVisibleHandler = (info) => {
        if (info === "EMAIL") {
            setEmailFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isEmailFocus.add) {
                setEmailFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setEmailFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
        if (info === "PWD") {
            setPasswordFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isPasswordFocus.add) {
                setPasswordFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setPasswordFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
    };
    //#endregion

    return (
        <div className={styles.main_container}>
            <form onSubmit={loginHandler} className={styles.login_form}>
                <h2>Inicio de Sesión</h2>
                <div className={styles.input_group}>
                    <label>CORREO</label>
                    {!loginData.email.isValid &&
                        loginData.email.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {loginData.email.isValid &&
                        loginData.email.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !loginData.email.isValid &&
                            loginData.email.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="email"
                        placeholder="Ejemplo@ejemplo.com"
                        onFocus={() => onVisibleHandler("EMAIL")}
                        onBlur={() => onVisibleHandler("EMAIL")}
                        onChange={(e) =>
                            setLoginData({
                                type: "EMAIL_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isEmailFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isEmailFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 3 letras y Maximo 100 <br />
                            Se permiten Minusculas,Mayusculas, caracteres
                            especiales y conectores "- . _"
                        </p>
                    )}
                </div>
                <div className={styles.input_group}>
                    <label>CONTRASEÑA</label>
                    {!loginData.password.isValid &&
                        loginData.password.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {loginData.password.isValid &&
                        loginData.password.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !loginData.password.isValid &&
                            loginData.password.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="password"
                        placeholder="********"
                        onFocus={() => onVisibleHandler("PWD")}
                        onBlur={() => onVisibleHandler("PWD")}
                        onChange={(e) =>
                            setLoginData({
                                type: "PWD_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isPasswordFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isPasswordFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 8 caracteres <br />
                            Debe usar al menos: <br />1 Minusculas, 1 Mayusculas
                            y 1 Numero
                        </p>
                    )}
                </div>
                <div className={styles.remember_validation}>
                    <label>¿Recordar inicio de sesión?</label>
                    <div
                        onClick={setRememberHandler}
                        className={styles.checkbox}
                    >
                        <i
                            className={`fa-solid fa-check ${
                                ctx.remeberLogin
                                    ? styles.check
                                    : styles.no_check
                            }`}
                        ></i>
                    </div>
                </div>
                <button className={`${styles.btn_group} ${styles.login_btn}`}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Iniciar Sesion</span>
                </button>
                {errorMessage && (
                    <p className={styles.login_info_process}>{errorMessage}</p>
                )}
                <div className={styles.signup_option}>
                    <label>¿No estas registrado?</label>
                    <button
                        onClick={() => navigate("/sign_up")}
                        className={`${styles.btn_group} ${styles.signup_btn}`}
                    >
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Registrarse</span>
                    </button>
                </div>
            </form>
            <div className={styles.img_container}>
                <img alt="Perfil Imagen" src={loginImg} />
            </div>
        </div>
    );
};

export default Login;